import { Ruleset } from 'htmlhint/types';
import monaco, { editor } from 'monaco-editor';
declare type Monaco = typeof monaco;
export declare class HTMLMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;
    protected ruleset?: Ruleset;
    protected model?: editor.ITextModel;
    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco, ruleset?: Ruleset, model?: editor.ITextModel);
    lint(): void;
    watch(): void;
}
export {};
