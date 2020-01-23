#!/usr/bin/env bash

echo "=================================="
echo "Generating optimized diagram"

echo "Running with extra 'optimization' options to filter some items from the diagram"

GENERATE_MODE=$1
if [ "${GENERATE_MODE}" == "" ]; then
    GENERATE_MODE="RUN_TEST"
fi;

./_generate_graph_image.sh $GENERATE_MODE ./test/test-data/known-good-output/optimized ./tslint.tslint-folders.json  -importBlacklist=utils -showImportAnyAsNodeNotEdges -clusterFromTslintJson
