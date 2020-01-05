import { isTested } from "../src/tslint-folders-diagrams";

describe("tslint-folders-diagrams tests", () => {
    it("works if isTested() is truthy", () => {
        expect(isTested()).toBeTruthy();
    });
});
