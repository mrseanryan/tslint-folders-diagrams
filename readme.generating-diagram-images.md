# generating diagrams of the architecture described in tslint.json

The configuration of `tslint-folders-diagrams` is a description of the architecture of your TypeScript project (see [tslint.tslint-folders.json](https://github.com/mrseanryan/tslint-folders-diagrams/blob/master/tslint.tslint-folders.json) for an example).

`tslint-folders-diagrams` can generate dot files from its configuration. A dot file is a simple format to describe a graph of nodes.

If you install `graphviz`, then you can generate image diagrams from those dot files.

So, you can automatically generate architecture diagrams from the same configuration that `tslint-folders-diagrams` uses to validate the source code.

![example diagram](https://github.com/mrseanryan/tslint-folders-diagrams/blob/master/static/images/example_diagram_from_Dot_output.png?raw=true)

_note: the example scripts output SVG files which are scalable and work with markdown and so work with gitlab, npmjs etc._

---

## install graphviz

https://graphviz.gitlab.io

---

## generating a graph image from tslint-folders-diagrams

`./generate_graph_image <path to tslint.json>`

### example

`./generate_graph_image_example`

## assumptions

-   graphviz has been installed and 'dot' is available at the command line.
-   the machine has an environment variable `TEMP` pointing to a temporary files location.

---

## notes for Windows

### Windows download

https://graphviz.gitlab.io/_pages/Download/Download_windows.html

Windows + Q -> Environment variables.

Add this to the PATH environment variable:

```
C:\Program Files (x86)\Graphviz2.38\bin
```

So then `dot.exe` is reachable.

### executing bash scripts on Windows

-   use cmder (bash)

http://cmder.net/

---

## references

### bash cheat sheet

https://devhints.io/bash

### graphviz

https://www.graphviz.org/

#### graphviz color schemes

https://graphviz.gitlab.io/_pages/doc/info/colors.html

The default used is `pastel19`.

#### graphviz online

http://www.webgraphviz.com/

#### graphviz in Visual Code

extension 'Graphviz Preview'
