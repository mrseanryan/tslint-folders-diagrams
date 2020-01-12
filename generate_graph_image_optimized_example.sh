#!/usr/bin/env bash

echo "=================================="
echo "Generating optimized diagram"

echo "Running with extra 'optimization' options to filter some items from the diagram"

./_generate_graph_image.sh  ./test/test-data/known-good-output/optimized ./tslint.tslint-folders.json  -importBlacklist=utils -showImportAnyAsNodeNotEdges -clusterFromTslintJson
