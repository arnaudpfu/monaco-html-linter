import { HTMLHint } from 'htmlhint';
import { Hint, Ruleset } from 'htmlhint/types';
import { editor, MarkerSeverity, MarkerTag, Uri } from 'monaco-editor';
import { capitalize } from './utils';

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
    protected lintedResponse: Hint[];

    constructor(html: string, ruleset: Ruleset = defaultRuleset) {
        this.html = html;
        this.ruleset = ruleset;
        this.lintedResponse = this.lint(html, ruleset);
    }

    public lint(html: string, ruleset: Ruleset = defaultRuleset): Hint[] {
        return HTMLHint.verify(html, ruleset);
    }

    public getEditorMarks(monaco: any): IMarkerData[] {
        return this.lintedResponse.map((issue) => ({
            startLineNumber: issue.line,
            startColumn: issue.col,
            endLineNumber: issue.line,
            endColumn: issue.col + issue.evidence.length,
            message: issue.message,
            severity: monaco.MarkerSeverity[capitalize(issue.type)],
        }));
    }

    public getLintedResponse(): Hint[] {
        return this.lintedResponse;
    }
}
