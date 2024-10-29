import type { Class } from '#types'

/**
 * Seals a class, preventing it from being extended.
 *
 * @remarks
 * Error is throw when attempting to instantiate a derived class.
 *
 * @example
 * ```typescript
 * @sealed
 * class Base { /* ... *\/ }
 *
 * class Derived extends Base { /* ... *\/ }
 *
 * const instance = new Derived() // throws
 */
export function sealed(
  target: Class<object>,
  context: ClassDecoratorContext<typeof target>,
) {
  return class extends target {
    constructor(...args: ConstructorParameters<typeof target>) {
      if (new.target !== target) {
        throw new Error(
          `Class ${target.name} is sealed and cannot be extended.`,
        )
      }
      super(...args)
    }
  }
}
