import monaco, { editor } from 'monaco-editor';
import { HTMLHint } from 'htmlhint';
import { Hint, Ruleset } from 'htmlhint/types';
import { capitalize } from './utils';

type Monaco = typeof monaco;

type MarkerSeveritySlug = 'Info' | 'Warning' | 'Error';

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
    protected model?: editor.ITextModel;

    constructor(html: string, ruleset: Ruleset = defaultRuleset, model?: editor.ITextModel) {
        this.html = html;
        this.ruleset = ruleset;
        this.linterResponse = this.lint();
        this.model = model;
    }

    public lint(): Hint[] {
        return HTMLHint.verify(this.html, this.ruleset);
    }

    public getEditorMarks(monaco: Monaco): editor.IMarkerData[] {
        return this.linterResponse.map((issue) => ({
            startLineNumber: issue.line,
            startColumn: issue.col,
            endLineNumber: issue.line,
            endColumn:
                issue.evidence !== ''
                    ? issue.col + issue.evidence.length
                    : this.model !== undefined
                    ? this.model.getLineLength(issue.line)
                    : issue.col + 1,
            message: issue.message,
            severity: monaco.MarkerSeverity[capitalize(issue.type) as MarkerSeveritySlug],
        }));
    }

    public getLinterResponse(): Hint[] {
        return this.linterResponse;
    }
}
