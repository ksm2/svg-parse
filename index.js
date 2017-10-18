const { parse, SyntaxError } = require('./parse');

/**
 * Generalizes a parsed SVG path and limits it to moveTo, lineTo, curveTo, and arc commands.
 *
 * @param {Command<any>[]} paths The SVG path to generalize.
 * @return {Command<'moveTo' | 'lineTo' | 'curveTo' | 'arc'>[]} The generalized SVG path.
 * @throws SyntaxError If the parsing fails.
 */
function generalize(paths) {
  return paths.map(({ type, props }, index) => {
    if (type === 'horizontal') {
      return { type: 'lineTo', props: { relative: props.relative, x: props.x, y: 0 } };
    }
    if (type === 'vertical') {
      return { type: 'lineTo', props: { relative: props.relative, y: props.y, x: 0 } };
    }
    if (type === 'smoothTo') {
      const last = paths[index - 1].props;
      const x1 = 2 * last.x - last.x2;
      const y1 = 2 * last.y - last.y2;
      return { type: 'curveTo', props: Object.assign({}, props, { x1, y1 }) };
    }
    if (type === 'quadraticTo') {
      return { type: 'curveTo', props: Object.assign({}, props, { x2: props.x1, y2: props.y1 }) };
    }
    if (type === 'tangentTo') {
      const last = paths[index - 1].props;
      const x1 = 2 * last.x - last.x1;
      const y1 = 2 * last.y - last.y1;
      return { type: 'curveTo', props: Object.assign({}, props, { x1, y1, x2: x1, y2: y1 }) };
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
  const result = parse(svgPath);
  if (options.generalize) {
    return generalize(result);
  }

  return result;
}

exports.parse = parseWrapper;
exports.generalize = generalize;
exports.SyntaxError = SyntaxError;
