# svg-parse
Parses SVG paths to a consumable object and JSON

## Installation

Use NPM to install it into your project:

    npm install --save svg-parse
  
## Usage

### Parsing
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

### Generalization
You can also generalize SVG paths to restrict them to `moveTo`, `lineTo`, `curveTo`, and `arc` commands, which are easier to draw:
```js
const { parse } = require('svg-parse');

const path = parse('M10 20 L20 20 h10 Z', { generalize: true });
console.dir(path);
```

The result will be:

```js
[ { type: 'moveTo', props: { relative: false, x: 10, y: 20 } },
  { type: 'lineTo', props: { relative: false, x: 20, y: 20 } },
  // Compare with result above!
  { type: 'lineTo', props: { relative: true, x: 10, y: 0 } },
  { type: 'close', props: null } ]
```

## Changelog

Please take a look at changes in the [CHANGELOG.md].

[CHANGELOG.md]: https://github.com/ksm2/svg-parse/blob/master/CHANGELOG.md
