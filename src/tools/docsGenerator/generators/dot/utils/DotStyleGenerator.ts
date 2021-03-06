import { DocConfig } from "../../../Config";
import { ClusterType } from "../../../graph/GraphCluster";
import { NodeType } from "../../../graph/GraphNode";
import { IDocOutputter } from "../../../interfaces/IDocOutputter";

export class DotStyleGenerator {
  constructor(
    protected config: DocConfig,
    protected outputter: IDocOutputter
  ) {}

  outputStyling() {
    this.outputGraphStyle();
    this.outputDefaultNodeStyling();
  }

  outputGraphNodeStyle(nodeType: NodeType) {
    switch (nodeType) {
      case NodeType.Normal:
        break;
      case NodeType.External:
        this.outputStylingForExternalNode();
        break;
      case NodeType.Any:
        this.outputStylingForAnyNode();
        break;
      default:
        throw new Error(`unhandled NodeType ${nodeType}`);
    }
  }

  private outputStylingForExternalNode() {
    this.outputter.outputLine("node [style=dashed]");
  }

  outputStylingForAnyNode() {
    this.outputStylingForExternalNode();
  }

  outputContainerStyle(clusterType: ClusterType) {
    this.outputPlaceLabelsAtTop();

    switch (clusterType) {
      case ClusterType.AreaWithSubFolders:
        this.outputter.outputLine(
          `node [shape="${this.config.dot.subFolderShape}"]`
        );
        break;
      case ClusterType.FromOptimization:
        this.outputOptimizedStyle();
        break;
      case ClusterType.DiagramCluster:
        this.outputOptimizedStyle();
        break;
      case ClusterType.Root:
      case ClusterType.TopLevel:
        this.outputter.outputLine(
          `node [shape="${this.config.dot.packageShape}"]`
        );
        break;
      default:
        throw new Error(`unhandled ClusterType ${clusterType}`);
    }
  }

  private outputOptimizedStyle() {
    this.outputter.outputLines([`color = gray`, `style=dashed`]);
  }

  outputPlaceLabelsAtTop() {
    this.outputter.outputLine("labelloc = t");
    this.outputter.outputLine("");
  }

  private outputGraphStyle() {
    this.outputter.outputLine(`graph [`);
    this.outputter.increaseIndent();
    this.outputter.outputLines([`bgcolor="#FFFFFF"`, `fillcolor="#FFFFFF"`]);
    this.outputter.decreaseIndent();
    this.outputter.outputLine(`]`);
  }

  private outputDefaultNodeStyling() {
    // ref: working_copy.dot

    this.outputter.outputLine("node [");
    this.outputter.increaseIndent();

    // ref: colorscheme = https://graphviz.gitlab.io/_pages/doc/info/colors.html

    this.outputter.outputLines([
      `labeljust="l"`,
      `colorscheme="${this.config.dot.colorScheme}"`,
      `style=filled`,
      `fillcolor=3`,
      `shape=record`
    ]);

    this.outputter.decreaseIndent();

    this.outputter.outputLines([
      `]`,
      ``,
      // setting both head, tail as normally only one will apply
      `edge [arrowhead="vee", arrowtail="vee", style=dashed, color="black"]`
    ]);
  }
}
