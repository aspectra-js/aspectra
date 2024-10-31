export type Args = unknown[]

/**
 * TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'.
 *
 * biome-ignore lint/suspicious/noExplicitAny: TS2545
 */
export type MixinConstructorArgs = any[]

/**
 * Matches the definiction of `class`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes}
 */
export interface Class<T, A extends Args> {
  new (...args: A): T
  prototype: Pick<T, keyof T>
}

/**
 * Matches the definition of `Function`
 *
 * {@link https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions}
 */
export type Fun<A extends Args, R, T = unknown> = (this: T, ...args: A) => R
