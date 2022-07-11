import monaco, { editor } from 'monaco-editor';
import { Hint, Ruleset } from 'htmlhint/types';
declare type Monaco = typeof monaco;
export declare class HTMLMonacoMarks {
    protected html: string;
    protected ruleset: Ruleset;
    protected linterResponse: Hint[];
    protected model?: editor.ITextModel;
    constructor(html: string, ruleset?: Ruleset, model?: editor.ITextModel);
    lint(): Hint[];
    getEditorMarks(monaco: Monaco): editor.IMarkerData[];
    getLinterResponse(): Hint[];
}
export {};
