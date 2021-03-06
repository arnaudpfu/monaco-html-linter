"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLMonacoLinter = void 0;
const HTMLMonacoMarks_1 = require("./HTMLMonacoMarks");
class HTMLMonacoLinter {
    constructor(editor, monaco, ruleset) {
        this.editor = editor;
        this.monaco = monaco;
        this.ruleset = ruleset;
    }
    lint() {
        var _a;
        const code = this.editor.getValue();
        const languageID = (_a = this.editor.getModel()) === null || _a === void 0 ? void 0 : _a.getLanguageId();
        if (languageID === 'html') {
            const monacoLinter = new HTMLMonacoMarks_1.HTMLMonacoMarks(code, this.ruleset, this.editor.getModel() || undefined);
            const issues = monacoLinter.getEditorMarks(this.monaco);
            const model = this.editor.getModel();
            if (model === null) {
                throw new Error("Your model still does't exist.");
            }
            this.monaco.editor.setModelMarkers(model, 'owner', issues);
        }
    }
    watch() {
        this.lint();
        this.editor.onDidChangeModelContent((e) => {
            this.lint();
        });
    }
}
exports.HTMLMonacoLinter = HTMLMonacoLinter;
