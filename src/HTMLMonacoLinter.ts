import monaco, { editor } from 'monaco-editor';
import { HTMLMonacoMarks } from './HTMLMonacoMarks';

type Monaco = typeof monaco;

export class HTMLMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;

    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        this.editor = editor;
        this.monaco = monaco;
    }

    public lint() {
        const code = this.editor.getValue();
        const languageID = this.editor.getModel()?.getLanguageId();
        if (languageID === 'html') {
            const monacoLinter = new HTMLMonacoMarks(code);
            const issues = monacoLinter.getEditorMarks(this.monaco);
            const model = this.editor.getModel();
            if (model === null) {
                throw new Error("Your model still does't exist.");
            }
            this.monaco.editor.setModelMarkers(model, 'owner', issues);
        }
    }

    public watch() {
        this.lint();
        this.editor.onDidChangeModelContent((e) => {
            this.lint();
        });
    }
}
