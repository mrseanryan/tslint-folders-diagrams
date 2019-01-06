# :open_file_folder: tslint-folders-diagrams

Generate architecture diagrams from the folder configuration of tslint-folders.

## status - stable

tslint-folders-diagrams is stable and in use every day in CI builds and on dev boxes (Linux, Mac, Windows) for at least one major product.

[![Travis](https://img.shields.io/travis/mrseanryan/tslint-folders-diagrams.svg)](https://travis-ci.org/mrseanryan/tslint-folders-diagrams)
[![Coveralls](https://img.shields.io/coveralls/mrseanryan/tslint-folders-diagrams.svg)](https://coveralls.io/github/mrseanryan/tslint-folders-diagrams)
[![install size](https://packagephobia.now.sh/badge?p=tslint-folders-diagrams)](https://packagephobia.now.sh/result?p=tslint-folders-diagrams)

[![Greenkeeper badge](https://badges.greenkeeper.io/mrseanryan/tslint-folders-diagrams.svg)](https://greenkeeper.io/)
[![Dependencies](https://david-dm.org/mrseanryan/tslint-folders-diagrams.svg)](https://david-dm.org/mrseanryan/tslint-folders-diagrams)
[![Dev Dependencies](https://david-dm.org/mrseanryan/tslint-folders-diagrams/dev-status.svg)](https://david-dm.org/mrseanryan/tslint-folders-diagrams?type=dev)

[![npm Package](https://img.shields.io/npm/v/tslint-folders-diagrams.svg?style=flat-square)](https://www.npmjs.org/package/tslint-folders-diagrams)
[![NPM Downloads](https://img.shields.io/npm/dm/tslint-folders-diagrams.svg)](https://npmjs.org/package/tslint-folders-diagrams)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/mrseanryan)

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

We use [SemVer](https://semver.org) for versioning. For the versions available, see the tags on this repository.

---

## usage

### 1 Install via yarn into your website

```
yarn add tslint-folders-diagrams
```

### 2 Generate a summary of the package configuration

Assuming that [tslint.tslint-folders.json](./tslint.tslint-folders.json) (from [tslint-folders](https://github.com/mrseanryan/tslint-folders)) has been correctly configured to model the expected package structure, then you can run this command to generate a summary:

```
node node_modules/tslint-folders-diagrams/dist/lib/tools/docsGenerator tslint.tslint-folders.json Text
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

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mrseanryan/tslint-folders-diagrams/blob/master/LICENSE) file for details
