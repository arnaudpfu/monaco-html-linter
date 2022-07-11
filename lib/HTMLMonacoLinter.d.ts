import { Ruleset } from 'htmlhint/types';
import monaco, { editor } from 'monaco-editor';
declare type Monaco = typeof monaco;
export declare class HTMLMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;
    protected ruleset?: Ruleset;
    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco, ruleset?: Ruleset);
    lint(): void;
    watch(): void;
}
export {};
