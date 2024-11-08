import { SealedClassExtentionError } from '../../lib/error'
import type { Class, MixinConstructorArgs } from '../../types'

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
export function sealed<T extends Class<object, MixinConstructorArgs>>(
  target: T,
  _: ClassDecoratorContext<T>,
) {
  return class extends target {
    constructor(..._: MixinConstructorArgs) {
      super()
      throw new SealedClassExtentionError(target.name, this.constructor.name)
    }
  }
}
