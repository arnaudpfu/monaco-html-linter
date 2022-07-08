import { editor } from 'monaco-editor';
export declare class HTMLMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: any;
    constructor(editor: editor.IStandaloneCodeEditor, monaco: any);
    lint(): void;
    watch(): void;
}
