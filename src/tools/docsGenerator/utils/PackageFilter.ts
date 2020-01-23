import { PackageFolder, PackageSubFolder } from "tslint-folders";

import { DocConfig } from "../Config";

export class PackageFilter {
    private readonly invalidPaths: string[];
    private readonly whiteListPaths: string[];
    private readonly skipSubFolders: boolean;

    constructor(config: DocConfig) {
        this.invalidPaths = this.parseBlacklist(config.importBlacklist);
        this.whiteListPaths = this.parseWhitelist(config.importWhitelist);
        this.skipSubFolders = config.skipSubFolders;
    }

    private parseBlacklist(list: string): string[] {
        return list.split(",");
    }

    private parseWhitelist(list: string): string[] {
        return list.split(",").filter(entry => entry.length > 0);
    }

    private passesBlacklist(importPath: string): boolean {
        return !this.invalidPaths.includes(importPath);
    }

    private passesBlackAndWhitelist(importPath: string): boolean {
        return this.passesBlacklist(importPath) && this.passesWhitelist(importPath);
    }

    private passesWhitelist(importPath: string): boolean {
        return this.whiteListPaths.length === 0 || this.whiteListPaths.includes(importPath);
    }

    get hasWhitelist(): boolean {
        return this.whiteListPaths.length > 0;
    }

    canOutputSubfoldersOf(folder: PackageFolder): boolean {
        return this.passesBlackAndWhitelist(folder.importPath);
    }

    isImportPathOkForFolder(folder: PackageFolder): boolean {
        return this.passesBlackAndWhitelist(folder.importPath);
    }

    isImportPathOkForFolderWithWhitelist(folder: PackageFolder): boolean {
        return this.isImportPathOkForFolder(folder) && this.passesWhitelist(folder.importPath);
    }

    isImportPathOkForSubFolder(folder: PackageSubFolder): boolean {
        // xxx dead param
        // black/white lists do not apply to sub-folders
        return !this.skipSubFolders;
    }

    isImportPathOkForEdges(importPath: string): boolean {
        return this.passesBlackAndWhitelist(importPath);
    }
}
