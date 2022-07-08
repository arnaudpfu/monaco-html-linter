# Monaco HTML Linter
Monaco HTML Linter is a simple HTML Linter plugin for the [Monaco Editor](https://microsoft.github.io/monaco-editor/). It uses [HTMLHint](https://htmlhint.com/) to verify HTML Code.

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