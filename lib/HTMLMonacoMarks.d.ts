import { Hint, Ruleset } from 'htmlhint/types';
import { MarkerSeverity, MarkerTag, Uri } from 'monaco-editor';
interface IRelatedInformation {
    resource: Uri;
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}
interface IMarkerData {
    code?: string | {
        value: string;
        target: Uri;
    };
    severity: MarkerSeverity;
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    relatedInformation?: IRelatedInformation[];
    tags?: MarkerTag[];
}
export declare class HTMLMonacoMarks {
    protected html: string;
    protected ruleset: Ruleset;
    protected lintedResponse: Hint[];
    constructor(html: string, ruleset?: Ruleset);
    lint(html: string, ruleset?: Ruleset): Hint[];
    getEditorMarks(monaco: any): IMarkerData[];
    getLintedResponse(): Hint[];
}
export {};
