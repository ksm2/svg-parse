const { parse, SyntaxError } = require('./parse');

/**
 * Generalizes a parsed SVG path and limits it to moveTo, lineTo, curveTo, and arc commands.
 *
 * @param {Command<any>[]} paths The SVG path to generalize.
 * @return {Command<'moveTo' | 'lineTo' | 'curveTo' | 'arc'>[]} The generalized SVG path.
 * @throws SyntaxError If the parsing fails.
 */
function generalize(paths) {
  let curX = 0;
  let curY = 0;
  return paths.map(({ type, props }, index) => {
    const last = index > 0 ? paths[index - 1].props : {};

    if (props == null) {
      return { type, props };
    }

    if (props.relative) {
      if ('x' in props) {
        curX = curX + props.x;
      }
      if ('y' in props) {
        curY = curY + props.y;
      }
    } else {
      if ('x' in props) {
        curX = props.x;
      }
      if ('y' in props) {
        curY = props.y;
      }
    }

    if (type === 'horizontal') {
      const x = props.x;
      const y = props.relative ? 0 : curY;
      return { type: 'lineTo', props: Object.assign({}, props, { x, y }) };
    }
    if (type === 'vertical') {
      const x = props.relative ? 0 : curX;
      const y = props.y;
      return { type: 'lineTo', props: Object.assign({}, props, { x, y }) };
    }
    if (type === 'smoothTo') {
      const x1 = 2 * last.x - last.x2;
      const y1 = 2 * last.y - last.y2;
      return { type: 'curveTo', props: Object.assign({}, props, { x1, y1 }) };
    }
    if (type === 'quadraticTo') {
      return { type: 'curveTo', props: Object.assign({}, props, { x2: props.x1, y2: props.y1 }) };
    }
    if (type === 'tangentTo') {
      const x1 = 2 * last.x - last.x1;
      const y1 = 2 * last.y - last.y1;
      return { type: 'curveTo', props: Object.assign({}, props, { x1, y1, x2: x1, y2: y1 }) };
    }

    return { type, props };
  });
}

/**
 * Makes all commands in an SVG path absolute.
 *
 * @param {Command<any>[]} paths The SVG path to make its commands absolute.
 * @return {Command<any>[]} The SVG path with absolute commands.
 */
function makeAbsolute(paths) {
  let x = 0;
  let y = 0;
  return paths.map(({ type, props }, index) => {
    if (props == null) {
      return { type, props };
    }

    if (!props.relative) {
      'x' in props && (x = props.x);
      'y' in props && (y = props.y);
      return { type, props };
    }

    props.relative = false;

    if ('x1' in props) {
      props.x1 = x + props.x1;
    }
    if ('y1' in props) {
      props.y1 = y + props.y1;
    }

    if ('x2' in props) {
      props.x2 = x + props.x2;
    }
    if ('y2' in props) {
      props.y2 = y + props.y2;
    }

    if ('x' in props) {
      x = props.x = x + props.x;
    }
    if ('y' in props) {
      y = props.y = y + props.y;
    }

    return { type, props };
  });
}

/**
 * Parses an SVG path and creates an array of commands out of it.
 *
 * @param {string} svgPath The SVG path to parse.
 * @param [options] {Partial<ParseOptions>} Options to handle during parsing.
 * @return {Command<any>[]} The parsed SVG path.
 * @throws SyntaxError If the parsing fails.
 */
function parseWrapper(svgPath, options = {}) {
  let result = parse(svgPath);
  if (options.makeAbsolute) {
    result = makeAbsolute(result);
  }
  if (options.generalize) {
    result = generalize(result);
  }

  return result;
}

exports.parse = parseWrapper;
exports.makeAbsolute = makeAbsolute;
exports.generalize = generalize;
exports.SyntaxError = SyntaxError;
