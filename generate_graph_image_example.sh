#!/usr/bin/env bash

echo "=================================="
echo "Generating basic diagram"

# colorScheme value is from: https://graphviz.gitlab.io/_pages/doc/info/colors.html
./_generate_graph_image.sh ./test/test-data/known-good-output/basic tslint.tslint-folders.json -colorScheme=pastel19 -maxColors=9 -subTitle="Top-level Packages (sub title)" -title="Project Packages (title)"
