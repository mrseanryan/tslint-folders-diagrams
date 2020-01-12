#!/usr/bin/env bash

echo "Running with extra 'optimization' options to filter some items from the diagram"

./_generate_graph_image.sh  ./tslint.tslint-folders.json  -importBlacklist=utils -showImportAnyAsNodeNotEdges -clusterFromTslintJson
