#!/usr/bin/env bash

echo "Running with extra 'optimization' options to filter some items from the diagram"

./_generate_graph_image.sh ./test-data/known-good-output/generate_diagram_optimized ./tslint.tslint-folders.json  -importBlacklist=utils -showImportAnyAsNodeNotEdges -clusterFromTslintJson
