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
  = MoveTo / CurveTo / LineTo / Horizontal / Vertical

MoveTo
  = _ op:("M" / "m") _ x:Number _ y:Number {
    return operate("moveTo", op, { x, y });
  }

CurveTo
  = _ op:("C" / "c") _ x1:Number _ y1:Number _ "," _ x2:Number _ y2:Number _ "," _ x:Number _ y:Number {
    return operate("curveTo", op, { x1, y1, x2, y2, x, y });
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

CloseOp
  = ("Z" / "z") {
    return { type: "close", props: null };
  }

Number "number"
  = _ [0-9]+ {
    return parseInt(text(), 10);
  }

_ "whitespace"
  = [ \t\n\r]* {
    return '';
  }
