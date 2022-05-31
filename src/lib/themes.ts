import {loader} from "@monaco-editor/react";
import {ITheme} from "../constants/interfaces";

const defineTheme = (theme: ITheme | undefined) => {
    if (theme === undefined) {
        return
    }

    return new Promise((res) => {
        Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${theme.name}.json`),
        ]).then(([monaco, themeData]) => {
            monaco.editor.defineTheme(theme.value, themeData);
            // @ts-ignore
            res();
        });
    });
};

export {
    defineTheme
}
