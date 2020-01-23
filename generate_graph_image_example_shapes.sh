#!/usr/bin/env bash

echo "=================================="
echo "Generating diagram with custom shapes"

# colorScheme value is from: https://graphviz.gitlab.io/_pages/doc/info/colors.html
./_generate_graph_image.sh ./test/test-data/known-good-output/shapes tslint.tslint-folders.json -colorScheme=pastel19 -maxColors=9 -subTitle="Top-level Packages (sub-title)" -title="Project Packages (title)" -packageShape=octagon -subFolderShape=component
