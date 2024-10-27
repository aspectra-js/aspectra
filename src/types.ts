export type Args = unknown[]

/**
 * biome-ignore lint/suspicious/noExplicitAny: TS2545
 *
 * A mixin class must have a constructor with a single rest parameter of type 'any[]'.
 */
export type MixinConstructorArgs = any[]

/**
 * biome-ignore lint/suspicious/noExplicitAny: Definition
 *
 * {@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes}
 */
export type Class<T, A extends Args = any[]> = {
  new (...args: A): T
  prototype: Pick<T, keyof T>
}

export type Fun<A extends Args, R, T = unknown> = (this: T, ...args: A) => R
