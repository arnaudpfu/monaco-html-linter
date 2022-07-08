import { editor } from 'monaco-editor';
import { HTMLMonacoMarks } from './HTMLMonacoMarks';

export class HTMLMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: any;

    constructor(editor: editor.IStandaloneCodeEditor, monaco: any) {
        this.editor = editor;
        this.monaco = monaco;
    }

    public lint() {
        const code = this.editor.getValue();
        const languageID = this.editor.getModel()?.getLanguageId();
        if (languageID === 'html') {
            const monacoLinter = new HTMLMonacoMarks(code);
            const issues = monacoLinter.getEditorMarks(this.monaco);
            this.monaco.editor.setModelMarkers(this.editor.getModel(), 'owner', issues);
        }
    }

    public watch() {
        this.lint();
        this.editor.onDidChangeModelContent((e) => {
            this.lint();
        });
    }
}
