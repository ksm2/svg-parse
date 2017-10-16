# svg-parse
Parses SVG paths to a consumable object and JSON

## Installation

Use NPM to install it into your project:

    npm install --save svg-parse
  
## Usage

Use the exported `parse` function to parse an SVG path to JSON:

```js
const { parse } = require('svg-parse');

const path = parse('M10 20 L20 20 h10 Z');
console.dir(path);
```

The result will be:

```js
[ { type: 'moveTo', props: { relative: false, x: 10, y: 20 } },
  { type: 'lineTo', props: { relative: false, x: 20, y: 20 } },
  { type: 'horizontal', props: { relative: true, x: 10 } },
  { type: 'close', props: null } ]
```
