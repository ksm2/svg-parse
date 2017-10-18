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
    arc: Arc
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

export interface Arc extends XYRelative {
  rx: number
  ry: number
  xAxisRotation: number
  largeArcFlag: boolean
  sweepFlag: boolean
}

/**
 * Location object used for SyntaxErrors.
 */
export interface ErrorLocation {
    offset: number
    line: number
    column: number
}

/**
 * Options to handle during parsing.
 */
export interface ParseOptions {
  generalize: boolean
  makeAbsolute: boolean
}

/**
 * Parses an SVG path and creates an array of commands out of it.
 *
 * @param {string} svgPath The SVG path to parse.
 * @param [options] {Partial<ParseOptions>} Options to handle during parsing.
 * @return {Command<any>[]} The parsed SVG path.
 * @throws SyntaxError If the parsing fails.
 */
export function parse(svgPath: string, options?: Partial<ParseOptions>): Command<any>[]

/**
 * Generalizes a parsed SVG path and limits it to moveTo, lineTo, curveTo, and arc commands.
 *
 * @param {Command<any>[]} paths The SVG path to generalize.
 * @return {Command<'moveTo' | 'lineTo' | 'curveTo' | 'arc'>[]} The generalized SVG path.
 * @throws SyntaxError If the parsing fails.
 */
export function generalize(paths: Command<any>[]): Command<'moveTo' | 'lineTo' | 'curveTo' | 'arc'>[]

/**
 * Makes all commands in an SVG path absolute.
 *
 * @param {Command<any>[]} paths The SVG path to make its commands absolute.
 * @return {Command<any>[]} The SVG path with absolute commands.
 */
export function makeAbsolute(paths: Command<any>[]): Command<any>[]

/**
 * Error thrown if parsing fails.
 */
export class SyntaxError extends Error {
    readonly expected: Array<{ type: string, description: string }>
    readonly found: string
    readonly location: { start: ErrorLocation, end: ErrorLocation }
}
