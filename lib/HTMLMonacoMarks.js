"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLMonacoMarks = void 0;
const htmlhint_1 = require("htmlhint");
const utils_1 = require("./utils");
const defaultRuleset = {
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
class HTMLMonacoMarks {
    constructor(html, ruleset = defaultRuleset) {
        this.html = html;
        this.ruleset = ruleset;
        this.linterResponse = this.lint();
    }
    lint() {
        return htmlhint_1.HTMLHint.verify(this.html, this.ruleset);
    }
    getEditorMarks(monaco) {
        return this.linterResponse.map((issue) => ({
            startLineNumber: issue.line,
            startColumn: issue.col,
            endLineNumber: issue.line,
            endColumn: issue.col + issue.evidence.length,
            message: issue.message,
            severity: monaco.MarkerSeverity[(0, utils_1.capitalize)(issue.type)],
        }));
    }
    getLinterResponse() {
        return this.linterResponse;
    }
}
exports.HTMLMonacoMarks = HTMLMonacoMarks;
