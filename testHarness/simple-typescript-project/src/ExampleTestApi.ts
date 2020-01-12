type TestFunction = () => void;

export namespace describe2 {
    export function skip2(name: string, test: TestFunction) {
        return 1;
    }
    export function only2(name: string, test: TestFunction) {
        return 1;
    }
}

export namespace it2 {
    export function only2(name: string, test: TestFunction) {
        return 1;
    }
    export function skip2(name: string, test: TestFunction) {
        return 1;
    }
}
