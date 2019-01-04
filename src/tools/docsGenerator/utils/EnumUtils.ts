import { DocFormat } from "../Config";

export namespace EnumUtils {
    export function parseDocFormat(formatString: string): DocFormat {
        const format = formatString as DocFormat;

        validateDocFormat(format);

        return format;
    }

    function validateDocFormat(format: DocFormat) {
        switch (format) {
            case DocFormat.Dot:
                return format;
            case DocFormat.Text:
                return format;
            default:
                throw new Error(`unhandled format '${format}'`);
        }
    }
}
