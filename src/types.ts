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
 * {@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes}
 *
 * biome-ignore lint/suspicious/noExplicitAny: Definition
 */
export type Class<T, A extends Args = any[]> = {
  new (...args: A): T
  prototype: Pick<T, keyof T>
}

/**
 * Matches the definition of `Function`
 *
 * {@see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions}
 */
export type Fun<A extends Args, R, T = unknown> = (this: T, ...args: A) => R
