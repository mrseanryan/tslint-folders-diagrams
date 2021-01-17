# :open_file_folder: tslint-folders-diagrams

Generate architecture diagrams from the folder configuration of tslint-folders.

## status - stable

tslint-folders-diagrams is stable and in use every day in CI builds and on dev boxes (Linux, Mac, Windows) for at least one major product.

[![Build Status](https://travis-ci.com/mrseanryan/tslint-folders-diagrams.svg?branch=master)](https://travis-ci.com/mrseanryan/tslint-folders-diagrams)

<!-- TODO add unit tests! -->
<!-- [![Coveralls](https://img.shields.io/coveralls/mrseanryan/tslint-folders-diagrams.svg)](https://coveralls.io/github/mrseanryan/tslint-folders-diagrams) -->

[![install size](https://packagephobia.now.sh/badge?p=tslint-folders-diagrams)](https://packagephobia.now.sh/result?p=tslint-folders-diagrams)

[![Dependencies](https://david-dm.org/mrseanryan/tslint-folders-diagrams.svg)](https://david-dm.org/mrseanryan/tslint-folders-diagrams)

[![npm Package](https://img.shields.io/npm/v/tslint-folders-diagrams.svg?style=flat-square)](https://www.npmjs.org/package/tslint-folders-diagrams)
[![NPM Downloads](https://img.shields.io/npm/dm/tslint-folders-diagrams.svg)](https://npmjs.org/package/tslint-folders-diagrams)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K73ALBJ)

---

## why?

Automatically create up-to-date architecture diagrams from the same config as used by [tslint-folders](https://github.com/mrseanryan/tslint-folders) to validate the source code.

---

## features

-   Provides a tool to generate architecture diagrams from the same model used by [tslint-folders](https://github.com/mrseanryan/tslint-folders)
-   Output formats:
    -   plain text - suitable for a markdown file
    -   dot (graphviz)
    -   svg (via graphviz)

---

## versioning

We use [SemVer](https://semver.org) for versioning. For the versions available, see [Releases](https://github.com/mrseanryan/tslint-folders-diagrams/releases).

---

## usage

### 1 Install via yarn into your website

```
yarn add tslint-folders-diagrams
```

### 2 Generate a summary of the package configuration

Assuming that [tslint.tslint-folders.json](./tslint.tslint-folders.json) (from [tslint-folders](https://github.com/mrseanryan/tslint-folders)) has been correctly configured to model the expected package structure, then you can run this command to generate a summary:

```
node node_modules/tslint-folders-diagrams/dist/lib/tslint-folders-diagrams.js tslint.tslint-folders.json Text
```

example output:

```
package structure:
_____
shell - Application Shell
  --> (any)

todo-area - TODO Area Package
  --> grid-package, utils
    folders:
      components - components
        --> (any)

      viewmodels - view models
        --> models, utils

      models - models
        --> utils

      utils - utils
        --> (none)

contact-area - Area that shows contact details
  --> grid-package, utils

grid-package - Grid Package with no dependencies
  --> (none)

utils - Utils package
  --> (none)

_____
```

Allowed imports are shown for each package, after the `-->` arrow.

### using graphviz to generate image diagrams of the architecture

A diagram can be automatically generated from the same config used to validated the code:

![example diagram](https://github.com/mrseanryan/tslint-folders-diagrams/blob/master/static/images/example_diagram_from_Dot_output.png?raw=true)

see [generating diagrams](https://github.com/mrseanryan/tslint-folders-diagrams/blob/master/readme.generating-diagram-images.md) for details.

### command line arguments

`tslint-folders-diagrams` has many command line arguments, to allow you to customize the output.

To see the available arguments, you can run the command, with no arguments:

```
node node_modules/tslint-folders-diagrams/dist/lib/tslint-folders-diagrams.js
```

The general usage pattern is:

```
node node_modules/tslint-folders-diagrams/dist/lib/tslint-folders-diagrams.js <path to tslint.json> <format> [options]
```

-   where format is one of: Text, Dot

The general options are:

| Option            | Description                                                                                               | Example                                |
| ----------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| disableTopCluster | Disable the automatically added top-level cluster (group). Helps if only the sub-folders are of interest. | `-disableTopCluster`                   |
| help              | Shows the usage text.                                                                                     | `-help` or `-h`                        |
| importBlacklist   | Exclude these top-level packages from the diagram. Helps to simplify the diagram.                         | `-importBlacklist=package-1,package-2` |
| importWhitelist   | Include only these top-level packages in the diagram. Helps to simplify the diagram.                      | `-importWhitelist=package-1,package-2` |
| output            | Write the output to the given filepath, instead of using standard output.                                 | `-outpath=/tmp/my-file.dot`            |
| skipSubFolders    | Exclude sub-folders from the diagram.                                                                     | `-skipSubFolders`                      |

The following options are specific to the `Dot` output format:

| Option                      | Description                                                                                                                                                                                                                                                                  | Example                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| clusterFromTslintJson       | Use `diagramCluster` from the `tslint.tslint-folders.json` config file, instead of automatically calculating a suitable cluster.                                                                                                                                             | `-clusterFromTslintJson`         |
| colorScheme                 | Controls which [graphviz color scheme](https://graphviz.gitlab.io/_pages/doc/info/colors.html) to use. Defaults to `pastel19`                                                                                                                                                | `-colorScheme=piyg11`            |
| disableGraphOptimizer       | Disable the graph optimizer. The graph optimizer tries to automatically simplify the diagram, by avoiding duplicate edges, and by merging shared edge end points and clusters. For some configurations, it could be that the result is better with optimizations turned off. | `-disableGraphOptimizer`         |
| maxColors                   | Control the maximum number of colors used from the graphviz theme. Defaults to 9 colors.                                                                                                                                                                                     | `-maxColors=6`                   |
| packageShape                | Control what kind of shapes are used to draw the packages. Defaults to oval. Allowed values are: box, oval, octagon, component, cyclinder, box3d, folder.                                                                                                                    | `-packageShape=cylinder`         |
| showImportAnyAsNodeNotEdges | If a package can import any other package, then this can result in a large number of edges connected to this package. To avoid that, this option instead renders the 'any' specification as a single 'imports any' node, which helps to simplify the diagram.                | `-showImportAnyAsNodeNotEdges`   |
| subFolderShape              | Control what kind of shapes are used to draw the sub-folders. Defaults to folder. Allowed values are: box, oval, octagon, component, cyclinder, box3d, folder.                                                                                                               | `-subFolderShape=octagon`        |
| subTitle                    | Set the sub-title of the diagram.                                                                                                                                                                                                                                            | `-subTitle="Top-level Packages"` |
| title                       | Set the title of the diagram.                                                                                                                                                                                                                                                | `-title="Project Packages"`      |

### examples

For working examples, see the following scripts:

| Script                                                  | Description                                                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `./generate_graph_image_example.sh`                     | Basic example that generates an image from the example configuration (`./tslint.tslint-folders.json`). |
| `./generate_graph_image_example_shapes.sh`              | Uses different kinds of shapes to draw the packages and sub-folders.                                   |
| `./generate_graph_image_optimized_example_blacklist.sh` | Uses optimization options to simplify the diagram.                                                     |
| `./generate_graph_image_example_whitelist.sh`           | Uses a whitelist, to only show some top-level packages. Generates a separate diagram of sub-folders.   |

---

## sites

| site                 | URL                                                   |
| -------------------- | ----------------------------------------------------- |
| source code (github) | https://github.com/mrseanryan/tslint-folders-diagrams |
| github page          | https://mrseanryan.github.io/tslint-folders-diagrams/ |
| npm                  | https://www.npmjs.com/package/tslint-folders-diagrams |

---

## building and testing this source code

To work on the source code for tslint-folders-diagrams, there are a few scripts:

| command    | description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| yarn build | Builds the tool to the 'dist' folder, where it can be executed.        |
| yarn docs  | Generates a summary of the package structure described in tslint.json. |
| yarn lint  | Lints the source code of the rules.                                    |
| yarn start | Builds, tests and lints the code.                                      |

---

## developing code in _this_ repository

see the [contributing readme](CONTRIBUTING.md).

## origin

This project is based on the excellent seeder project [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).

The project was started to avoid having to repeatedly fix similar coding issues in large TypeScript code bases.

### ORIGINAL readme (from the seeder project)

[see here](https://github.com/mrseanryan/tslint-folders-diagrams/blob/master/readme.original.md)

---

## that's it

That's pretty much it. Let me know if this is useful or how it can be improved!

## authors

Original work by Sean Ryan - mr.sean.ryan(at gmail.com)

## licence = MIT

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mrseanryan/tslint-folders-diagrams/blob/master/LICENSE) file for details.
