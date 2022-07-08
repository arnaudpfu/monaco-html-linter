# Monaco HTML Linter
Simple HTML Linter for the Monaco Editor.

## Installation

```
npm i monaco-html-linter
```

## Usage

```ts
import monaco, { editor } from 'monaco-editor';
import HTMLMonacoLinter from 'monaco-html-linter';

// The Monaco Editor can be easily created, given an
// empty container and an options literal.
// Two members of the literal are "value" and "language".
// The editor takes the full size of its container.

const editor = monaco.editor.create(document.getElementById('container'), {
  value: 'html code here ...',
  language: 'html'
});

const linter = new HTMLMonacoLinter(editor, monaco);
linter.watch();

```

## License

MIT, see the [LICENSE](/LICENSE.md) file for detail.