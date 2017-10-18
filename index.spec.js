const { expect } = require('chai');
const { parse } = require('./index');

describe('SVG path', () => {

  it('contains M as single', () => {
    expect(parse('M0 0')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
    ]);
    expect(parse('M23 42')).eql([
      { type: 'moveTo', props: { relative: false, x: 23, y: 42 } },
    ]);
    expect(parse('M-23 -42')).eql([
      { type: 'moveTo', props: { relative: false, x: -23, y: -42 } },
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

  it('contains M concatenated', () => {
    expect(parse('M0 0 12 13 14 15Z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 13 } },
      { type: 'lineTo', props: { relative: false, x: 14, y: 15 } },
      { type: 'close', props: null },
    ]);
  });

  it('contains m as single', () => {
    expect(parse('m0 0')).eql([
      { type: 'moveTo', props: { relative: true, x: 0, y: 0 } },
    ]);
    expect(parse('m42 1337')).eql([
      { type: 'moveTo', props: { relative: true, x: 42, y: 1337 } },
    ]);
  });

  it('contains m concatenated', () => {
    expect(parse('m0 0 12 13 14 15Z')).eql([
      { type: 'moveTo', props: { relative: true, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 13 } },
      { type: 'lineTo', props: { relative: true, x: 14, y: 15 } },
      { type: 'close', props: null },
    ]);
  });

  it('contains L as single', () => {
    expect(parse('M0 0 L12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 14 } },
    ]);
  });

  it('contains L concatenated', () => {
    expect(parse('M0 0 L12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 14 } },
      { type: 'lineTo', props: { relative: false, x: 13, y: 15 } },
    ]);
  });

  it('contains l as single', () => {
    expect(parse('M0 0 l12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 14 } },
    ]);
  });

  it('contains l concatenated', () => {
    expect(parse('M0 0 l12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 14 } },
      { type: 'lineTo', props: { relative: true, x: 13, y: 15 } },
    ]);
  });

  it('contains H as single', () => {
    expect(parse('M0 0H99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: false, x: 99 } },
    ]);
  });

  it('contains H concatenated', () => {
    expect(parse('M0 0H 99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: false, x: 99 } },
      { type: 'horizontal', props: { relative: false, x: 88 } },
      { type: 'horizontal', props: { relative: false, x: 77 } },
    ]);
  });

  it('contains h as single', () => {
    expect(parse('M0 0h99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: true, x: 99 } },
    ]);
  });

  it('contains h concatenated', () => {
    expect(parse('M0 0h 99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: true, x: 99 } },
      { type: 'horizontal', props: { relative: true, x: 88 } },
      { type: 'horizontal', props: { relative: true, x: 77 } },
    ]);
  });

  it('contains V as single', () => {
    expect(parse('M0 0V99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: false, y: 99 } },
    ]);
  });

  it('contains V concatenated', () => {
    expect(parse('M0 0V99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: false, y: 99 } },
      { type: 'vertical', props: { relative: false, y: 88 } },
      { type: 'vertical', props: { relative: false, y: 77 } },
    ]);
  });

  it('contains v as single', () => {
    expect(parse('M0 0v99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: true, y: 99 } },
    ]);
  });

  it('contains v concatenated', () => {
    expect(parse('M0 0v99 88 77')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: true, y: 99 } },
      { type: 'vertical', props: { relative: true, y: 88 } },
      { type: 'vertical', props: { relative: true, y: 77 } },
    ]);
  });

  it('contains C as single', () => {
    expect(parse('M10 10 C20 20, 40 20, 50 10')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: false, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
    ]);
  });

  it('contains C concatenated', () => {
    expect(parse('M10 10 C20 20, 40 20, 50 10 60 60, 20 40, 10 50')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: false, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
      { type: 'curveTo', props: { relative: false, x1: 60, y1: 60, x2: 20, y2: 40, x: 10, y: 50 } },
    ]);
  });

  it('contains c as single', () => {
    expect(parse('M10 10 c20 20 40 20 50 10')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
    ]);
    expect(parse('M10 10 c20 20, 40 20, 50 10')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
    ]);
  });

  it('contains c concatenated', () => {
    expect(parse('M10 10 c20 20, 40 20, 50 10 60 60, 20 40, 10 50')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
      { type: 'curveTo', props: { relative: true, x1: 60, y1: 60, x2: 20, y2: 40, x: 10, y: 50 } },
    ]);
  });

  it('contains S as single', () => {
    expect(parse('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: false, x2: 150, y2: 150, x: 180, y: 80 } },
    ]);
  });

  it('contains S concatenated', () => {
    expect(parse('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80 180 180, 200 99')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: false, x2: 150, y2: 150, x: 180, y: 80 } },
      { type: 'smoothTo', props: { relative: false, x2: 180, y2: 180, x: 200, y: 99 } },
    ]);
  });

  it('contains s as single', () => {
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

  it('contains s concatenated', () => {
    expect(parse('M10 80 C 40 10, 65 10, 95 80 s 150 150, 180 80 180 180, 200 99')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'curveTo', props: { relative: false, x1: 40, y1: 10, x2: 65, y2: 10, x: 95, y: 80 } },
      { type: 'smoothTo', props: { relative: true, x2: 150, y2: 150, x: 180, y: 80 } },
      { type: 'smoothTo', props: { relative: true, x2: 180, y2: 180, x: 200, y: 99 } },
    ]);
  });

  it('contains Q as single', () => {
    expect(parse('M10 80 Q 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('contains Q concatenated', () => {
    expect(parse('M10 80 Q 95 10, 180 80 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('contains q as single', () => {
    expect(parse('M10 80 q 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: true, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('contains q concatenated', () => {
    expect(parse('M10 80 q 95 10, 180 80 95 10, 180 80')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: true, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'quadraticTo', props: { relative: true, x1: 95, y1: 10, x: 180, y: 80 } },
    ]);
  });

  it('contains T as single', () => {
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

  it('contains T concatenated', () => {
    expect(parse('M10 80 Q 95 10 180 80 T12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: false, x: 12, y: 14 } },
      { type: 'tangentTo', props: { relative: false, x: 13, y: 15 } },
    ]);
  });

  it('contains t as single', () => {
    expect(parse('M10 80 Q 95 10, 180 80 t12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: true, x: 12, y: 14 } },
    ]);
  });

  it('contains t concatenated', () => {
    expect(parse('M10 80 Q 95 10 180 80 t12 14 13 15')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 80 } },
      { type: 'quadraticTo', props: { relative: false, x1: 95, y1: 10, x: 180, y: 80 } },
      { type: 'tangentTo', props: { relative: true, x: 12, y: 14 } },
      { type: 'tangentTo', props: { relative: true, x: 13, y: 15 } },
    ]);
  });

  it('contains A as single', () => {
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

  it('contains A concatenated', () => {
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

  it('contains a as single', () => {
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

  it('contains a concatenated', () => {
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

  it('contains Z as single', () => {
    expect(parse('M0 0 Z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

  it('contains z as single', () => {
    expect(parse('M0 0 z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

});
