#!/usr/bin/env bash

ECHO Running with extra 'optimization' options to filter some items from the diagram

./generate_graph_image.sh  ./tslint.tslint-folders-diagrams.json  -importBlacklist=utils -showImportAnyAsNodeNotEdges -clusterFromTslintJson
