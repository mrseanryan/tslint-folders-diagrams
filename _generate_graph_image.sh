#!/usr/bin/env bash

# stop on first error:
set -e

GENERATE_MODE=$1

# assumption: the machine has an environment variable TEMP pointing to a temporary files location.
TEMP_OUT_DIR=`mktemp -d 2>/dev/null || mktemp -d -t 'temp'`

OUT_TEXT_PATH=$TEMP_OUT_DIR/tslint-folders-diagrams-docs.txt;
OUT_DOT_PATH=$TEMP_OUT_DIR/tslint-folders-diagrams-docs.dot;
OUT_IMAGE_PATH=$TEMP_OUT_DIR/tslint-folders-diagrams-docs.svg;

PATH_TO_KNOWN_GOOD_DIR=$2;
PATH_TO_TSLINT_JSON=$3;

ERRORS_OCCURRED="N"

function fail()
{
    msg=$1
    echo $msg

    ERRORS_OCCURRED="Y";
    echo "[error]"
}

function diff_files()
{
    new=$1
    old=$2
    description=$3

    # Filter out 'generated' lines which depend on time (and for SVG, the dot tool version):
    old_filtered=$old.filtered
    new_filtered=$new.filtered

    cat $old | grep -v enerated > $old_filtered
    cat $new | grep -v enerated > $new_filtered

    cmp --silent $old_filtered $new_filtered || handle_diff $new $old $description
}

function handle_diff()
{
    new=$1
    old=$2
    description=$3

    if [ "${GENERATE_MODE}" == "-update-snapshots" ]; then
        echo "Updating known-good snapshot at $old"
        cp $new $old
    else
        fail "File output for '$description' is not as expected! - see [old]$old vs [new]$new"
    fi;
}

echo yarn output to Text ...;
yarn --silent docs $PATH_TO_TSLINT_JSON Text -outpath=$OUT_TEXT_PATH "$4" "$5" "$6" "$7" "$8" "$9"
echo "Text file is at $OUT_TEXT_PATH"

echo yarn output to Dot ...;
yarn --silent docs $PATH_TO_TSLINT_JSON Dot -outpath=$OUT_DOT_PATH "$4" "$5" "$6" "$7" "$8" "$9"
echo "Dot file is at $OUT_DOT_PATH"

echo "comparing output..."
diff_files $OUT_TEXT_PATH $PATH_TO_KNOWN_GOOD_DIR/output.txt Text
diff_files $OUT_DOT_PATH $PATH_TO_KNOWN_GOOD_DIR/output.dot Dot

if [ "${ERRORS_OCCURRED}" == "Y" ]; then
    echo "[errors occurred]"
    exit 1
else
    echo "[OK]"
fi;

# NOT outputting SVG on CI build, as Travis machine does not have 'dot' installed
if [ "${MY_BUILD_ENV}" == "" ]; then
    echo "executing dot ..."
    dot $OUT_DOT_PATH -Tsvg -o $OUT_IMAGE_PATH;
    echo "graph image is at $OUT_IMAGE_PATH"
    echo "comparing output..."
    diff_files $OUT_IMAGE_PATH $PATH_TO_KNOWN_GOOD_DIR/output.svg SVG
    # SVG can fail just due to different ordering - so just warn
    if [ "${ERRORS_OCCURRED}" == "Y" ]; then
        echo "[warning - SVG difference!]"
        ERRORS_OCCURRED="N"
    else
        echo "[OK]"
    fi;
else
    echo "[skipped] dot"
fi;

if [ "${ERRORS_OCCURRED}" == "Y" ]; then
    echo "[errors occurred]"
    exit 1
else
    echo "[OK]"
fi;

echo [done];
