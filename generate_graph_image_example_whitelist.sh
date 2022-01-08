#!/usr/bin/env bash

echo "=================================="
echo "Generating basic diagram, with whitelist of packages"

GENERATE_MODE=$1
if [ "${GENERATE_MODE}" == "" ]; then
    GENERATE_MODE="RUN_TEST"
fi;

# colorScheme value is from: https://graphviz.gitlab.io/_pages/doc/info/colors.html
echo "-importWhitelist=todo-area,contact-area,shell,utils -skipSubFolders"
./_generate_graph_image.sh $GENERATE_MODE ./test/test-data/known-good-output/whitelist tslint.tslint-folders.json -subTitle="Top-level Packages [whitelist todo-area,contact-area,shell,utils] (sub title)" -title="Project Packages with whitelist (title)" -importWhitelist=todo-area,contact-area,shell,utils -skipSubFolders
