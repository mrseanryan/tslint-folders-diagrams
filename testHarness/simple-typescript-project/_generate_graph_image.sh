#!/usr/bin/env bash

# stop on first error:
set -e

# assumption: the machine has an environment variable TEMP pointing to a temporary files location.

TEMP_OUT_DIR=`mktemp -d 2>/dev/null || mktemp -d -t 'temp'`

OUT_TEXT_PATH=$TEMP_OUT_DIR/tslint-folders-diagrams-docs.txt;
OUT_DOT_PATH=$TEMP_OUT_DIR/tslint-folders-diagrams-docs.dot;
OUT_IMAGE_PATH=$TEMP_OUT_DIR/tslint-folders-diagrams-docs.svg;

PATH_TO_KNOWN_GOOD_DIR=$1;
PATH_TO_TSLINT_JSON=$2;

function fail()
{
    msg=$1
    echo $msg

    exit 1
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

    cmp --silent $old_filtered $new_filtered || fail "File output for '$description' is not as expected! - see [old]$old vs [new]$new"
}

echo yarn output to Text ...;
node ./node_modules/tslint-folders-diagrams/dist/lib/tslint-folders-diagrams.js $PATH_TO_TSLINT_JSON Text -outpath=$OUT_TEXT_PATH "$3" "$4" "$5" "$6" "$7"
echo "Text file is at $OUT_TEXT_PATH"

echo yarn output to Dot ...;
node ./node_modules/tslint-folders-diagrams/dist/lib/tslint-folders-diagrams.js $PATH_TO_TSLINT_JSON Dot -outpath=$OUT_DOT_PATH "$3" "$4" "$5" "$6" "$7"
echo "Dot file is at $OUT_DOT_PATH"

echo dot ...;
dot $OUT_DOT_PATH -Tsvg -o $OUT_IMAGE_PATH;
echo "graph image is at $OUT_IMAGE_PATH"

echo "comparing output..."
diff_files $OUT_TEXT_PATH $PATH_TO_KNOWN_GOOD_DIR/output.txt Text
diff_files $OUT_DOT_PATH $PATH_TO_KNOWN_GOOD_DIR/output.dot Dot
diff_files $OUT_IMAGE_PATH $PATH_TO_KNOWN_GOOD_DIR/output.svg SVG

echo [done];
