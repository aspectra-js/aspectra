import type { Class, MixinConstructorArgs } from '#types'

/**
 * Seals a class, preventing it from being extended.
 *
 * @remarks
 * Error is thrown when attempting to instantiate a derived class.
 *
 * @example
 * ```typescript
 * @sealed
 * class Base {}
 *
 * class Derived extends Base {}
 *
 * const instance = new Derived() // throws
 * ```
 */
export function sealed<T extends Class<object>>(
  target: T,
  _: ClassDecoratorContext<T>,
) {
  return class extends target {
    constructor(...args: MixinConstructorArgs) {
      if (new.target !== target) {
        throw new Error(
          `Class ${target.name} is sealed and cannot be extended.`,
        )
      }
      super(...args)
    }
  }
}
