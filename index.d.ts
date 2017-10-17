export interface Command<T extends keyof OperatorMap> {
    type: T
    props: OperatorMap[T]
}

export interface OperatorMap {
    moveTo: XYRelative
    lineTo: XYRelative
    curveTo: CurveTo
    smoothTo: SmoothTo
    quadraticTo: QuadraticTo
    tangentTo: XYRelative
    horizontal: XRelative
    vertical: YRelative
    close: null
}

export interface Relative {
    relative: boolean
}

export interface XYRelative extends Relative {
    x: number
    y: number
}

export interface QuadraticTo extends XYRelative {
    x1: number
    y1: number
}

export interface SmoothTo extends XYRelative {
    x2: number
    y2: number
}

export interface CurveTo extends QuadraticTo, SmoothTo {
}

export interface XRelative extends Relative {
    x: number
}

export interface YRelative extends Relative {
    y: number
}

export interface ErrorLocation {
    offset: number
    line: number
    column: number
}

/**
 * Parses an SVG path and creates an array of commands out of it.
 *
 * @param {string} svgPath The SVG path to parse.
 * @return {Command[]} The parsed SVG path.
 * @throws SyntaxError If the parsing fails.
 */
export function parse(svgPath: string): Command[]

export class SyntaxError extends Error {
    readonly expected: Array<{ type: string, description: string }>
    readonly found: string
    readonly location: { start: ErrorLocation, end: ErrorLocation }
}
