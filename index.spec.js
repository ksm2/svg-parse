const { expect } = require('chai');
const { parse, generalize, makeAbsolute } = require('./index');

describe('parse', () => {

  it('understands SVG paths with M as single-parametered commands', () => {
    expect(parse('M0 0')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
    ]);
    expect(parse('M23 42')).eql([
      { type: 'moveTo', props: { relative: false, x: 23, y: 42 } },
    ]);
    expect(parse('M-23 -42')).eql([
      { type: 'moveTo', props: { relative: false, x: -23, y: -42 } },
    ]);
    expect(parse('M-23e+4 -42e-6')).eql([
      { type: 'moveTo', props: { relative: false, x: -23e+4, y: -42e-6 } },
    ]);
    expect(parse('M-23E+4 -42E-6')).eql([
      { type: 'moveTo', props: { relative: false, x: -23e+4, y: -42e-6 } },
    ]);
    expect(parse('M-23.23 42.12')).eql([
      { type: 'moveTo', props: { relative: false, x: -23.23, y: 42.12 } },
    ]);
    expect(parse('M0 0 L12 13 M14 15 Z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 13 } },
      { type: 'moveTo', props: { relative: false, x: 14, y: 15 } },
      { type: 'close', props: null },
    ]);
  });

  it('understands SVG paths with M concatenated commands', () => {
    expect(parse('M0 0 12 13 14 15Z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 13 } },
      { type: 'lineTo', props: { relative: false, x: 14, y: 15 } },
      { type: 'close', props: null },
    ]);
  });

  it('understands SVG paths with m as single-parametered commands', () => {
    expect(parse('m0 0')).eql([
      { type: 'moveTo', props: { relative: true, x: 0, y: 0 } },
    ]);
    expect(parse('m42 1337')).eql([
      { type: 'moveTo', props: { relative: true, x: 42, y: 1337 } },
    ]);
  });

  it('understands SVG paths with m concatenated commands', () => {
    expect(parse('m0 0 12 13 14 15Z')).eql([
      { type: 'moveTo', props: { relative: true, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 13 } },
      { type: 'lineTo', props: { relative: true, x: 14, y: 15 } },
      { type: 'close', props: null },
    ]);
  });

  it('understands SVG paths with L as single-parametered commands', () => {
    expect(parse('M0 0 L12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 14 } },
    ]);
  });

  it('understands SVG paths with L concatenated commands', () => {
    expect(parse('M0 0 L12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 14 } },
      { type: 'lineTo', props: { relative: false, x: 13, y: 15 } },
    ]);
  });

  it('understands SVG paths with l as single-parametered commands', () => {
    expect(parse('M0 0 l12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 14 } },
    ]);
  });

  it('understands SVG paths with l concatenated commands', () => {
    expect(parse('M0 0 l12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 14 } },
      { type: 'lineTo', props: { relative: true, x: 13, y: 15 } },
    ]);
  });

  it('understands SVG paths with H as single-parametered commands', () => {
    expect(parse('M0 0H99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: false, x: 99 } },
    ]);
  });

  it('understands SVG paths with H concatenated commands', () => {
    expect(parse('M0 0H 99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: false, x: 99 } },
      { type: 'horizontal', props: { relative: false, x: 88 } },
      { type: 'horizontal', props: { relative: false, x: 77 } },
    ]);
  });

  it('understands SVG paths with h as single-parametered commands', () => {
    expect(parse('M0 0h99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: true, x: 99 } },
    ]);
  });

  it('understands SVG paths with h concatenated commands', () => {
    expect(parse('M0 0h 99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: true, x: 99 } },
      { type: 'horizontal', props: { relative: true, x: 88 } },
      { type: 'horizontal', props: { relative: true, x: 77 } },
    ]);
  });

  it('understands SVG paths with V as single-parametered commands', () => {
    expect(parse('M0 0V99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: false, y: 99 } },
    ]);
  });

  it('understands SVG paths with V concatenated commands', () => {
    expect(parse('M0 0V99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: false, y: 99 } },
      { type: 'vertical', props: { relative: false, y: 88 } },
      { type: 'vertical', props: { relative: false, y: 77 } },
    ]);
  });

  it('understands SVG paths with v as single-parametered commands', () => {
    expect(parse('M0 0v99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: true, y: 99 } },
    ]);
  });

  it('understands SVG paths with v concatenated commands', () => {
    expect(parse('M0 0v99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: true, y: 99 } },
      { type: 'vertical', props: { relative: true, y: 88 } },
      { type: 'vertical', props: { relative: true, y: 77 } },
    ]);
  });

  it('understands SVG paths with C as single-parametered commands', () => {
    expect(parse('M10 10 C20 20, 40 20, 50 10')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: false, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
    ]);
  });

  it('understands SVG paths with C concatenated commands', () => {
    expect(parse('M10 10 C20 20, 40 20, 50 10 60 60, 20 40, 10 50')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: false, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
      { type: 'curveTo', props: { relative: false, x1: 60, y1: 60, x2: 20, y2: 40, x: 10, y: 50 } },
    ]);
  });

  it('understands SVG paths with c as single-parametered commands', () => {
    expect(parse('M10 10 c20 20 40 20 50 10')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
    ]);
    expect(parse('M10 10 c20 20, 40 20, 50 10')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
    ]);
  });

  it('understands SVG paths with c concatenated commands', () => {
    expect(parse('M10 10 c20 20, 40 20, 50 10 60 60, 20 40, 10 50')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 60, y1: 60, x2: 20, y2: 40, x: 10, y: 50 } },
    ]);
  });

  it('understands SVG paths with S as single-parametered commands', () => {
    expect(parse('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: false, x2: 150, y2: 150, x: 180, y: 80 } },
    ]);
  });

  it('understands SVG paths with S concatenated commands', () => {
    expect(parse('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80 180 180, 200 99')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: false, x2: 150, y2: 150, x: 180, y: 80 } },
      { type: 'smoothTo', props: { relative: false, x2: 180, y2: 180, x: 200, y: 99 } },
    ]);
  });

  it('understands SVG paths with s as single-parametered commands', () => {
    expect(parse('M10 80 C 40 10 65 10 95 80 s 150 150 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: true, x2: 150, y2: 150, x: 180, y: 80 } },
    ]);
    expect(parse('M10 80 C 40 10, 65 10, 95 80 s 150 150, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: true, x2: 150, y2: 150, x: 180, y: 80 } },
    ]);
  });

  it('understands SVG paths with s concatenated commands', () => {
    expect(parse('M10 80 C 40 10, 65 10, 95 80 s 150 150, 180 80 180 180, 200 99')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: true, x2: 150, y2: 150, x: 180, y: 80 } },
      { type: 'smoothTo', props: { relative: true, x2: 180, y2: 180, x: 200, y: 99 } },
    ]);
  });

  it('understands SVG paths with Q as single-parametered commands', () => {
    expect(parse('M10 80 Q 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('understands SVG paths with Q concatenated commands', () => {
    expect(parse('M10 80 Q 95 10, 180 80 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('understands SVG paths with q as single-parametered commands', () => {
    expect(parse('M10 80 q 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: true, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('understands SVG paths with q concatenated commands', () => {
    expect(parse('M10 80 q 95 10, 180 80 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: true, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'quadraticTo', props: { relative: true, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('understands SVG paths with T as single-parametered commands', () => {
    expect(parse('M10 80 Q 95 10 180 80 T12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: false, x: 12, y: 14 } },
    ]);
    expect(parse('M10 80 Q 95 10, 180 80 T12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: false, x: 12, y: 14 } },
    ]);
  });

  it('understands SVG paths with T concatenated commands', () => {
    expect(parse('M10 80 Q 95 10 180 80 T12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: false, x: 12, y: 14 } },
      { type: 'tangentTo', props: { relative: false, x: 13, y: 15 } },
    ]);
  });

  it('understands SVG paths with t as single-parametered commands', () => {
    expect(parse('M10 80 Q 95 10, 180 80 t12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: true, x: 12, y: 14 } },
    ]);
  });

  it('understands SVG paths with t concatenated commands', () => {
    expect(parse('M10 80 Q 95 10 180 80 t12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: true, x: 12, y: 14 } },
      { type: 'tangentTo', props: { relative: true, x: 13, y: 15 } },
    ]);
  });

  it('understands SVG paths with A as single-parametered commands', () => {
    expect(parse(`
      M10 315
      L 110 215
      A 30 50 0 0 1 162.55 162.45
      L 172.55 152.45
      A 30 50 -45 0 1 215.1 109.9
      L 315 10
    `)).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 315} },
      { type: 'lineTo', props: { relative: false, x: 110, y: 215} },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: 0, largeArcFlag: false, sweepFlag: true, x: 162.55, y: 162.45 } },
      { type: 'lineTo', props: { relative: false, x: 172.55, y: 152.45 } },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: -45, largeArcFlag: false, sweepFlag: true, x: 215.1, y: 109.9 } },
      { type: 'lineTo', props: { relative: false, x: 315, y: 10 } },
    ]);
    expect(parse(`
      M10 315
      L 110 215
      A 30 50, 0, 0, 1, 162.55 162.45
      L 172.55 152.45
      A 30 50, -45, 0, 1, 215.1 109.9
      L 315 10
    `)).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 315} },
      { type: 'lineTo', props: { relative: false, x: 110, y: 215} },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: 0, largeArcFlag: false, sweepFlag: true, x: 162.55, y: 162.45 } },
      { type: 'lineTo', props: { relative: false, x: 172.55, y: 152.45 } },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: -45, largeArcFlag: false, sweepFlag: true, x: 215.1, y: 109.9 } },
      { type: 'lineTo', props: { relative: false, x: 315, y: 10 } },
    ]);
  });

  it('understands SVG paths with A concatenated commands', () => {
    expect(parse(`
      M10 315
      L 110 215
      A 30 50 0 0 1 162.55 162.45 30 50 -45 0 1 215.1 109.9
      L 315 10
    `)).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 315} },
      { type: 'lineTo', props: { relative: false, x: 110, y: 215} },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: 0, largeArcFlag: false, sweepFlag: true, x: 162.55, y: 162.45 } },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: -45, largeArcFlag: false, sweepFlag: true, x: 215.1, y: 109.9 } },
      { type: 'lineTo', props: { relative: false, x: 315, y: 10 } },
    ]);
  });

  it('understands SVG paths with a as single-parametered commands', () => {
    expect(parse(`
      M10 315
      L 110 215
      a 30 50 0 0 1 162.55 162.45
      L 172.55 152.45
      a 30 50 -45 0 1 215.1 109.9
      L 315 10
    `)).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 315} },
      { type: 'lineTo', props: { relative: false, x: 110, y: 215} },
      { type: 'arc', props: { relative: true, rx: 30, ry: 50, xAxisRotation: 0, largeArcFlag: false, sweepFlag: true, x: 162.55, y: 162.45 } },
      { type: 'lineTo', props: { relative: false, x: 172.55, y: 152.45 } },
      { type: 'arc', props: { relative: true, rx: 30, ry: 50, xAxisRotation: -45, largeArcFlag: false, sweepFlag: true, x: 215.1, y: 109.9 } },
      { type: 'lineTo', props: { relative: false, x: 315, y: 10 } },
    ]);
  });

  it('understands SVG paths with a concatenated commands', () => {
    expect(parse(`
      M+10+315
      L 110 215
      a 30 50 0 0 1 162.55 162.45 30 50 -45 0 1 215.1 109.9
      L 315 10
    `)).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 315} },
      { type: 'lineTo', props: { relative: false, x: 110, y: 215} },
      { type: 'arc', props: { relative: true, rx: 30, ry: 50, xAxisRotation: 0, largeArcFlag: false, sweepFlag: true, x: 162.55, y: 162.45 } },
      { type: 'arc', props: { relative: true, rx: 30, ry: 50, xAxisRotation: -45, largeArcFlag: false, sweepFlag: true, x: 215.1, y: 109.9 } },
      { type: 'lineTo', props: { relative: false, x: 315, y: 10 } },
    ]);
  });

  it('understands SVG paths with Z close path commands', () => {
    expect(parse('M0 0 Z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

  it('understands SVG paths with z close path commands', () => {
    expect(parse('M0 0 z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

});


describe('generalize', () => {

  it('makes "horizontal" and "vertical" to "lineTo"', () => {
    expect(generalize(parse('m0 0 h12 v21z'))).eql([
      { type: 'moveTo', props: { relative: true, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 0, y: 21 } },
      { type: 'close', props: null },
    ]);
    expect(generalize(parse('M0 0 H12 V21z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 21 } },
      { type: 'close', props: null },
    ]);
    expect(generalize(parse('M10 10 H12 V21z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 10 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 21 } },
      { type: 'close', props: null },
    ]);
    expect(parse('M0 0 H12 V21z', { generalize: true })).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 21 } },
      { type: 'close', props: null },
    ]);
  });

  it('makes "smoothTo" to "curveTo"', () => {
    expect(generalize(parse('M0 0 C10 10, 20 10, 30 0 S50 -10, 60 0z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 10, y1: 10, x2: 20, y2: 10, x: 30, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: -10, x2: 50, y2: -10, x: 60, y: 0 } },
      { type: 'close', props: null },
    ]);
    expect(parse('M0 0 C10 10, 20 10, 30 0 S50 -10, 60 0z', { generalize: true })).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 10, y1: 10, x2: 20, y2: 10, x: 30, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: -10, x2: 50, y2: -10, x: 60, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

  it('makes "quadraticTo" to "curveTo"', () => {
    expect(generalize(parse('M0 0 Q12 21 42 1337z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 12, y1: 21, x2: 12, y2: 21, x: 42, y: 1337 } },
      { type: 'close', props: null },
    ]);
    expect(parse('M0 0 Q12 21 42 1337z', { generalize: true })).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 12, y1: 21, x2: 12, y2: 21, x: 42, y: 1337 } },
      { type: 'close', props: null },
    ]);
  });

  it('makes "tangentTo" to "curveTo"', () => {
    expect(generalize(parse('M0 0 Q10 10 20 0 T40 0z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 10, y1: 10, x2: 10, y2: 10, x: 20, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 30, y1: -10, x2: 30, y2: -10, x: 40, y: 0 } },
      { type: 'close', props: null },
    ]);
    expect(parse('M0 0 Q10 10 20 0 T40 0z', { generalize: true })).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 10, y1: 10, x2: 10, y2: 10, x: 20, y: 0 } },
      { type: 'curveTo', props: { relative: false, x1: 30, y1: -10, x2: 30, y2: -10, x: 40, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

});


describe('makeAbsolute', () => {

  it('makes "lineTo" absolute', () => {
    expect(makeAbsolute(parse('m0 0 l10 20 h12 v22z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 10, y: 20 } },
      { type: 'horizontal', props: { relative: false, x: 22 } },
      { type: 'vertical', props: { relative: false, y: 42 } },
      { type: 'close', props: null },
    ]);
  });

  it('makes "curveTo" and "smoothTo" absolute', () => {
    expect(makeAbsolute(parse('m100 100 c50 100 50 100 100 0 s50 -100 100 0z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 100, y: 100 } },
      { type: 'curveTo', props: { relative: false, x1: 150, y1: 200, x2: 150, y2: 200, x: 200, y: 100 } },
      { type: 'smoothTo', props: { relative: false, x2: 250, y2: 0, x: 300, y: 100 } },
      { type: 'close', props: null },
    ]);
  });

  it('makes "quadraticTo" and "tangentTo" absolute', () => {
    expect(makeAbsolute(parse('m100 100 q50 100 100 0 t100 0z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 100, y: 100 } },
      { type: 'quadraticTo', props: { relative: false, x1: 150, y1: 200, x: 200, y: 100 } },
      { type: 'tangentTo', props: { relative: false, x: 300, y: 100 } },
      { type: 'close', props: null },
    ]);
  });

  it('makes "arc" absolute', () => {
    expect(makeAbsolute(parse('m100 100 a30 50 45 0 1 100 100z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 100, y: 100 } },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: 45, largeArcFlag: false, sweepFlag: true, x: 200, y: 200 } },
      { type: 'close', props: null },
    ]);
    expect(makeAbsolute(parse('m100 100 a30 50 45 0 1 200 100z'))).eql([
      { type: 'moveTo', props: { relative: false, x: 100, y: 100 } },
      { type: 'arc', props: { relative: false, rx: 30, ry: 50, xAxisRotation: 45, largeArcFlag: false, sweepFlag: true, x: 300, y: 200 } },
      { type: 'close', props: null },
    ]);
  });

});
