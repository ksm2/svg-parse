// SVG Path Grammar
// ==========================
//
// Accepts expressions like "M80 90 Z" and computes their value.

{
  // Init ...
  function isLowerCase(str) {
    return str.toLocaleLowerCase() === str;
  }

  function addAttrs(obj, attrs) {
    Object.assign(obj.props, attrs);
    return obj;
  }
}

SVGPath
  = _ head:MoveToCommand _ tail:LineCommand* _ end:(CloseOp _)? {
    if (end) {
      tail = tail.concat(end[0]);
    }
    return [head].concat(tail);
  }

LineCommand
  = LineToCommand / HorizontalCommand / VerticalCommand

MoveToCommand
  = _ op:MoveToOp _ x:Number _ y:Number {
    return addAttrs(op, { x, y });
  }

LineToCommand
  = _ op:LineToOp _ x:Number _ y:Number {
    return addAttrs(op, { x, y });
  }

HorizontalCommand
  = _ op:HorizontalOp _ x:Number {
    return addAttrs(op, { x });
  }

VerticalCommand
  = _ op:VerticalOp _ y:Number {
    return addAttrs(op, { y });
  }

Number "number"
  = _ [0-9]+ {
    return parseInt(text(), 10);
  }

MoveToOp
  = ("M" / "m") {
    return { type: "moveTo", props: { relative: isLowerCase(text()) } };
  }

LineToOp
  = ("L" / "l") {
    return { type: "lineTo", props: { relative: isLowerCase(text()) } };
  }

HorizontalOp
  = ("H" / "h") {
    return { type: "horizontal", props: { relative: isLowerCase(text()) } };
  }

VerticalOp
  = ("V" / "v") {
    return { type: "vertical", props: { relative: isLowerCase(text()) } };
  }

CloseOp
  = "Z" {
    return { type: "close", props: null };
  }

_ "whitespace"
  = [ \t\n\r]* {
    return '';
  }
