import { DocFormat } from "../Config";

export namespace UsageText {
    const NEW_LINE = "\n";

    function getFormats(): string {
        let texts: string[] = [];

        for (let item in DocFormat) {
            if (isNaN(Number(item))) {
                texts.push(item);
            }
        }

        return texts.join(", ");
    }

    export function showUsage() {
        console.error(
            `USAGE: index.ts <path to tslint.json> <format> [options]${NEW_LINE}` +
                `  where format is one of: ${getFormats()}${NEW_LINE}` +
                `  where options can be:${NEW_LINE}` +
                `    -disableTopCluster${NEW_LINE}` +
                `    -help OR -h${NEW_LINE}` +
                `    -importBlacklist=<list of packages to exclude>${NEW_LINE}` +
                `    -importWhitelist=<list of top-level packages to include>${NEW_LINE}` +
                `    -outpath=<path to output file>${NEW_LINE}` +
                `    -skipSubFolders${NEW_LINE}` +
                `  options specific to the Dot format:${NEW_LINE}` +
                `    -clusterFromTslintJson${NEW_LINE}` +
                `    -colorScheme=<graphviz color scheme name>${NEW_LINE}` +
                `    -disableGraphOptimizer${NEW_LINE}` +
                `    -maxColors=<number of colors used by colorScheme>${NEW_LINE}` +
                `    -packageShape=<graphviz shape> (default is oval)${NEW_LINE}` +
                `      example shapes: box|oval|octagon|component|cyclinder|box3d|folder${NEW_LINE}` +
                `    -showImportAnyAsNodeNotEdges${NEW_LINE}` +
                `    -subFolderShape=<graphviz shape> (default is folder)${NEW_LINE}` +
                `    -subTitle=<sub title>${NEW_LINE}` +
                `    -title=<title>${NEW_LINE}`
        );
    }
}
