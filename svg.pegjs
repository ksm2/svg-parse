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
  = _ head:MoveTo _ tail:LineCommand* _ end:(CloseOp _)? {
    if (end) {
      tail = tail.concat(end[0]);
    }
    return [head].concat(tail);
  }

LineCommand
  = MoveTo / CurveTo / SmoothTo / QuadraticTo / LineTo / TangentTo / Horizontal / Vertical / Arc

MoveTo
  = _ op:("M" / "m") _ x:Number _ y:Number {
    return operate("moveTo", op, { x, y });
  }

CurveTo
  = _ op:("C" / "c") _ x1:Number _ y1:Number Comma x2:Number _ y2:Number Comma x:Number _ y:Number {
    return operate("curveTo", op, { x1, y1, x2, y2, x, y });
  }

SmoothTo
  = _ op:("S" / "s") _ x2:Number _ y2:Number Comma x:Number _ y:Number {
    return operate("smoothTo", op, { x2, y2, x, y });
  }

QuadraticTo
  = _ op:("Q" / "q") _ x1:Number _ y1:Number Comma x:Number _ y:Number {
    return operate("quadraticTo", op, { x1, y1, x, y });
  }

TangentTo
  = _ op:("T" / "t") _ x:Number _ y:Number {
    return operate("tangentTo", op, { x, y });
  }

LineTo
  = _ op:("L" / "l") _ x:Number _ y:Number {
    return operate("lineTo", op, { x, y });
  }

Horizontal
  = _ op:("H" / "h") _ x:Number {
    return operate("horizontal", op, { x });
  }

Vertical
  = _ op:("V" / "v") _ y:Number {
    return operate("vertical", op, { y });
  }

Arc
  = _ op:("A" / "a") _ rx:Number _ ry:Number Comma xAxisRotation:Number Comma largeArcFlag:Boolean Comma sweepFlag:Boolean Comma x:Number _ y:Number {
    return operate("arc", op, { rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y });
  }

CloseOp
  = ("Z" / "z") {
    return { type: "close", props: null };
  }

Number "number"
  = _ "-"? [0-9]+ ("." [0-9]+)? {
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

_ "whitespace"
  = [ \t\n\r]* {
    return '';
  }
