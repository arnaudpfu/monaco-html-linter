import monaco, { MarkerSeverity, MarkerTag, Uri } from 'monaco-editor';
import { Hint, Ruleset } from 'htmlhint/types';
declare type Monaco = typeof monaco;
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
    protected rinterResponseet;
    protected lintedResponse: Hint[];
    constructor(html: string, ruleset?: Ruleset);
    lint(): Hint[];
    getEinterResponsenaco: Monaco): IMarkerData[];
    getLintedResponse(): Hint[];
}
export {};
