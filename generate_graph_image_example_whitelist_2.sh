#!/usr/bin/env bash

echo "=================================="
echo "Generating basic diagram, with whitelist of packages"

GENERATE_MODE=$1
if [ "${GENERATE_MODE}" == "" ]; then
    GENERATE_MODE="RUN_TEST"
fi;

echo "-importWhitelist=todo-area -disableTopCluster"
./_generate_graph_image.sh $GENERATE_MODE ./test/test-data/known-good-output/whitelist-and-sub-folders tslint.tslint-folders.json -subTitle="todo-area sub-folders [whitelist todo-area] (sub title)" -title="todo-area (title)" -importWhitelist=todo-area -disableTopCluster
