import {
    ImportsBetweenPackagesRuleConfig, PackageFolder, PackageSubFolder
} from "../../../../model/ImportsBetweenPackagesRuleConfig";
import { DocConfig } from "../../Config";
import { Edge } from "../../graph/Edge";
import { GraphCluster } from "../../graph/GraphCluster";
import { GraphGenerator } from "../../graph/GraphGenerator";
import { GraphNode } from "../../graph/GraphNode";
import { GraphOptimizer } from "../../graph/utils/GraphOptimizer";
import { GraphVisitor } from "../../graph/utils/GraphVisitor";
import { IDocGenerator } from "../../interfaces/IDocGenerator";
import { IDocOutputter } from "../../interfaces/IDocOutputter";
import { DateHelper } from "../../utils/DateHelper";
import { DocGeneratorBase } from "../shared/DocGeneratorBase";
import { DotStyleGenerator } from "./utils/DotStyleGenerator";
import { MapNameToId } from "./utils/MapNameToId";

export class DotDocGenerator extends DocGeneratorBase implements IDocGenerator {
  private mapNameToId = new MapNameToId();
  private styler: DotStyleGenerator;

  constructor(protected config: DocConfig, protected outputter: IDocOutputter) {
    super(config, outputter);

    this.styler = new DotStyleGenerator(config, outputter);
  }

  generateDoc(packageConfig: ImportsBetweenPackagesRuleConfig): void {
    const graph = this.generateGraph(packageConfig);

    this.outputSectionSeparator("Header");
    this.outputHeader();
    this.outputter.outputLine(``);

    this.outputSectionSeparator("Styling");
    this.styler.outputStyling();
    this.outputter.outputLine(``);

    this.outputSectionSeparator("Nodes and Clusters");

    graph.nodes.forEach(node => {
      if (node instanceof GraphCluster) {
        this.outputCluster(node);
        return;
      }

      if (node instanceof GraphNode) {
        this.outputGraphNode(node);
      }
    });

    this.outputter.outputLine(``);

    this.outputSectionSeparator("Edges");
    this.outputEdges(graph);
    this.outputter.outputLine(``);

    this.outputFooter();
  }

  private generateGraph(
    packageConfig: ImportsBetweenPackagesRuleConfig
  ): GraphCluster {
    const generator = new GraphGenerator(this.config, this.filter);
    const graph = generator.generateGraph(packageConfig);

    const optimizer = new GraphOptimizer();
    optimizer.optimize(graph);

    return graph;
  }

  private outputHeader() {
    this.outputter.outputLine(
      `/* auto-generated by tslint-folders docs tool at ${DateHelper.nowHumanReadable()}*/`
    );

    this.outputter.outputLine("digraph packages {");
    this.outputter.increaseIndent();

    this.outputGraphSettings();
  }

  private outputGraphSettings() {
    this.outputSectionSeparator("Graph settings");
    this.outputter.outputLine(`graph [`);
    this.outputter.increaseIndent();

    this.outputter.outputLines([
      // needed to allow edge to have *cluster* as a destination:
      `compound=true`,
      // try to combine the edges:
      `concentrate=true`,
      `label = "${this.config.dot.title}"`,
      `labelloc = t`,
      ``,
      `//dpi = 200`,
      `ranksep=0.65`,
      `nodesep=0.40`,
      // top to bottom:
      `rankdir=TB`,
      ``,
      `style="filled"`,
      ``,
      `len=0`
    ]);

    this.outputter.decreaseIndent();
    this.outputter.outputLine(`]`);
  }

  private outputFooter() {
    this.outputter.decreaseIndent();
    this.outputter.outputLine("}");
  }

  private outputSectionSeparator(sectionName: string) {
    this.outputter.outputLine(
      `/* ${sectionName} ================================= */`
    );
  }

  private outputGraphNode(node: GraphNode, prefix?: string) {
    this.outputScopeBegin();

    if (node.isExternal) {
      this.styler.outputStylingForExternalNode();
    }

    this.outputNode(node, prefix);

    this.outputScopeEnd();

    this.outputter.outputLine("");
  }

  private outputScopeBegin() {
    this.outputter.outputLine("{");
  }

  private outputScopeEnd() {
    this.outputter.outputLine("}");
  }

  /**
   * Output the separate graph cluster.
   */
  private outputCluster(cluster: GraphCluster) {
    const isContainer = cluster.nodes.length > 0;
    if (!isContainer) {
      return;
    }

    this.outputContainerNodeStart(cluster);

    this.outputSubNodes(cluster);

    this.outputContainerNodeEnd();
    this.outputter.outputLine(``);
  }

  private outputContainerNodeStart(cluster: GraphCluster) {
    this.outputter.outputLine(`subgraph cluster_${cluster.id} {`);
    this.outputter.increaseIndent();

    this.styler.outputContainerStyle(cluster.clusterType);

    const formattedDescription =
      cluster.description.length > 0 ? ` - ${cluster.description}` : "";

    this.outputter.outputLine(
      `label = "${cluster.name}${formattedDescription}"`
    );
  }

  private outputContainerNodeEnd() {
    // styling at END so is not broken by contained node styling

    this.outputter.decreaseIndent();

    this.outputter.outputLine("}");
  }

  private outputNode(node: GraphNode, prefix?: string) {
    const packageIdKey = this.getPrefixedPackageId(node.id, prefix);

    const fillColor = this.getColorNumber(packageIdKey);

    this.outputter.outputLine(
      `${node.id} [label="${node.name}\n${
        node.description
      }" fillcolor=${fillColor}]`
    );
  }

  private getColorNumber(packageIdKey: string): number {
    // TODO xxx review
    if (!this.mapNameToId.hasId(packageIdKey)) {
      this.mapNameToId.getId(packageIdKey);
    }

    let packageNumber = this.mapNameToId.getNumberOrThrow(packageIdKey);

    if (packageNumber > this.config.dot.maxColors) {
      packageNumber = packageNumber % this.config.dot.maxColors;
    }

    if (packageNumber === 0) {
      // for a graphviz color scheme, the color number must be 1 based:
      packageNumber = 1;
    }

    return packageNumber;
  }

  private getPrefixedPackageId(packageName: string, prefix?: string): string {
    return `${prefix}_${packageName}`;
  }

  private outputEdges(root: GraphCluster) {
    const visitor = new GraphVisitor(root);
    visitor.visitEdges(edge => this.outputEdge(edge));
  }

  private outputEdge(edge: Edge) {
    let destination = edge.destination;
    let origin = edge.origin;

    let extraAttribute = "";

    if (edge.destination instanceof GraphCluster) {
      // the destination needs to switch to some node in the cluster:
      const nodes = edge.destination.nodes;
      if (nodes.length === 0) {
        console.warn(
          `// warning: The cluster ${
            edge.destination.id
          } is empty, but is the destination for an edge.`
        );
        return;
      }

      destination = nodes[0];
      extraAttribute += ` lhead=cluster_${edge.destination.id}`;
    }
    if (edge.origin instanceof GraphCluster) {
      const nodes = edge.origin.nodes;
      if (nodes.length === 0) {
        console.warn(
          `// warning: The cluster ${
            edge.origin.id
          } is empty, but is the origin for an edge.`
        );
        return;
      }

      origin = nodes[0];
      extraAttribute += ` ltail=cluster_${edge.origin.id}`;
    }

    this.outputter.outputLine(
      `${origin.id}-> ${destination.id} [${extraAttribute}]`
    );
  }

  private outputSubNodes(cluster: GraphCluster) {
    if (cluster.nodes.length === 0) {
      this.outputter.outputLine("");
      return;
    }

    cluster.nodes.forEach(node => {
      if (node instanceof GraphCluster) {
        this.outputCluster(node);
        return;
      }

      this.outputGraphNode(node, cluster.name);

      this.outputter.outputLine("");
    });
  }
}
