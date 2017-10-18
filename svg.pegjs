// SVG Path Grammar
// ==========================
//
// Accepts expressions like "M80 90 Z" and computes their value.

{
  function isLowerCase(str) {
    return str.toLocaleLowerCase() === str;
  }

  function operate(type, op, props) {
    props.relative = isLowerCase(op);
    return { type, props };
  }
}

SVGPath
  = _ head:MoveTo _ tail:LineCommand* _ {
    return [].concat.apply([], [head].concat(tail));
  }

LineCommand
  = MoveTo / CurveTo / SmoothTo / QuadraticTo / LineTo / TangentTo / Horizontal / Vertical / Arc / Close

MoveTo
  = _ op:("M" / "m") _ x:Number Comma y:Number tail:(_ Number Comma Number)* {
    return tail.reduce((last, [, x, , y]) => last.concat(operate("lineTo", op, { x, y })), [operate("moveTo", op, { x, y })]);
  }

CurveTo
  = _ op:("C" / "c") tail:(_ Number Comma Number Comma Number Comma Number Comma Number Comma Number)* {
    return tail.reduce((last, [, x1, , y1, , x2, , y2, , x, , y]) => last.concat(operate("curveTo", op, { x1, y1, x2, y2, x, y })), []);
  }

SmoothTo
  = _ op:("S" / "s") tail:(_ Number Comma Number Comma Number Comma Number)* {
    return tail.reduce((last, [, x2, , y2, , x, , y]) => last.concat(operate("smoothTo", op, { x2, y2, x, y })), []);
  }

QuadraticTo
  = _ op:("Q" / "q") tail:(_ Number Comma Number Comma Number Comma Number)* {
    return tail.reduce((last, [, x1, , y1, , x, , y]) => last.concat(operate("quadraticTo", op, { x1, y1, x, y })), []);
  }

TangentTo
  = _ op:("T" / "t") tail:(_ Number Comma Number)* {
    return tail.reduce((last, [, x, , y]) => last.concat(operate("tangentTo", op, { x, y })), []);
  }

LineTo
  = _ op:("L" / "l") tail:(_ Number Comma Number)* {
    return tail.reduce((last, [, x, , y]) => last.concat(operate("lineTo", op, { x, y })), []);
  }

Horizontal
  = _ op:("H" / "h") tail:(_ Number)* {
    return tail.reduce((last, [, x]) => last.concat(operate("horizontal", op, { x })), []);
  }

Vertical
  = _ op:("V" / "v") tail:(_ Number)* {
    return tail.reduce((last, [, y]) => last.concat(operate("vertical", op, { y })), []);
  }

Arc
  = _ op:("A" / "a") tail:(_ Number Comma Number Comma Number Comma Boolean Comma Boolean Comma Number Comma Number)* {
    return tail.reduce((last, [, rx, , ry, , xAxisRotation, , largeArcFlag, , sweepFlag, , x, , y]) => last.concat(operate("arc", op, { rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y })), []);
  }

Close
  = _ ("Z" / "z") {
    return { type: "close", props: null };
  }

Number "number"
  = _ Sign? [0-9]+ ("." [0-9]+)? {
    return parseFloat(text());
  }

Boolean "boolean"
  = _ [01] {
    return parseInt(text(), 2) > 0;
  }

Comma "comma"
  = _ ","? _ {
    return '';
  }

Sign "sign"
  = "+" / "-"

_ "whitespace"
  = [ \t\n\r]* {
    return '';
  }
