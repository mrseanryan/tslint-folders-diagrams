import { ImportsBetweenPackagesRuleConfig } from "tslint-folders";

export interface IDocGenerator {
    generateDoc(packageConfig: ImportsBetweenPackagesRuleConfig): void;
}
