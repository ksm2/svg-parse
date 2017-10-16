const { expect } = require('chai');
const { parse } = require('./index');

describe('SVG path', () => {

  it('contains M', () => {
    expect(parse('M0 0')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
    ]);
    expect(parse('M23 42')).eql([
      { type: 'moveTo', props: { relative: false, x: 23, y: 42 } },
    ]);
    expect(parse('M0 0 L12 13 M14 15 Z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 13 } },
      { type: 'moveTo', props: { relative: false, x: 14, y: 15 } },
      { type: 'close', props: null },
    ]);
  });

  it('contains m', () => {
    expect(parse('m0 0')).eql([
      { type: 'moveTo', props: { relative: true, x: 0, y: 0 } },
    ]);
    expect(parse('m42 1337')).eql([
      { type: 'moveTo', props: { relative: true, x: 42, y: 1337 } },
    ]);
  });

  it('contains L', () => {
    expect(parse('M0 0 L12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: false, x: 12, y: 14 } },
    ]);
  });

  it('contains l', () => {
    expect(parse('M0 0 l12 14')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'lineTo', props: { relative: true, x: 12, y: 14 } },
    ]);
  });

  it('contains H', () => {
    expect(parse('M0 0H99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: false, x: 99 } },
    ]);
  });

  it('contains h', () => {
    expect(parse('M0 0h99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'horizontal', props: { relative: true, x: 99 } },
    ]);
  });

  it('contains V', () => {
    expect(parse('M0 0V99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: false, y: 99 } },
    ]);
  });

  it('contains v', () => {
    expect(parse('M0 0v99')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'vertical', props: { relative: true, y: 99 } },
    ]);
  });

  it('contains C', () => {
    expect(parse('M10 10 C20 20, 40 20, 50 10')).eql([
      { type: 'moveTo', props: { relative: false, x: 10, y: 10 } },
      { type: 'curveTo', props: { relative: false, x1: 20, y1: 20, x2: 40, y2: 20, x: 50, y: 10 } },
    ]);
  });

  it('contains Z', () => {
    expect(parse('M0 0 Z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

  it('contains z', () => {
    expect(parse('M0 0 z')).eql([
      { type: 'moveTo', props: { relative: false, x: 0, y: 0 } },
      { type: 'close', props: null },
    ]);
  });

});
