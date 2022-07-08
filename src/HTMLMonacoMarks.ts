import monaco, { MarkerSeverity, MarkerTag, Uri } from 'monaco-editor';
import { HTMLHint } from 'htmlhint';
import { Hint, Ruleset } from 'htmlhint/types';
import { capitalize } from './utils';

type Monaco = typeof monaco;

type MarkerSeveritySlug = 'Info' | 'Warning' | 'Error';

interface IRelatedInformation {
    resource: Uri;
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}

interface IMarkerData {
    code?:
        | string
        | {
              value: string;
              target: Uri;
          };
    severity: MarkerSeverity; // Hint | Info | Warning | Error
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    relatedInformation?: IRelatedInformation[];
    tags?: MarkerTag[];
}

const defaultRuleset: Ruleset = {
    'tagname-lowercase': true,
    'attr-lowercase': true,
    'attr-value-double-quotes': true,
    'doctype-first': true,
    'tag-pair': true,
    'spec-char-escape': true,
    'id-unique': true,
    'src-not-empty': true,
    'attr-no-duplication': true,
    'title-require': true,
};

export class HTMLMonacoMarks {
    protected html: string;
    protected ruleset: Ruleset;
    protected linterResponse: Hint[];

    constructor(html: string, ruleset: Ruleset = defaultRuleset) {
        this.html = html;
        this.ruleset = ruleset;
        this.linterResponse = this.lint();
    }

    public lint(): Hint[] {
        return HTMLHint.verify(this.html, this.ruleset);
    }

    public getEditorMarks(monaco: Monaco): IMarkerData[] {
        return this.linterResponse.map((issue) => ({
            startLineNumber: issue.line,
            startColumn: issue.col,
            endLineNumber: issue.line,
            endColumn: issue.col + issue.evidence.length,
            message: issue.message,
            severity: monaco.MarkerSeverity[capitalize(issue.type) as MarkerSeveritySlug],
        }));
    }

    public getLinterResponse(): Hint[] {
        return this.linterResponse;
    }
}
