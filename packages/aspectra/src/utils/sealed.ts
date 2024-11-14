import { SealedClassExtentionError } from '../internal/lib/error'
import type { Class, MixinConstructorArgs } from '../types'

/**
 * # Sealed
 *
 * Seals a class, preventing it from being extended.
 *
 * <Callout type='info'>
 *   Error is thrown when attempting to instantiate a derived class.
 * </Callout>
 *
 * ```typescript
 * import { sealed } from 'aspectra/utils'
 *
 * @sealed
 * class Base {}
 *
 * class Derived extends Base {}
 *
 * try {
 *   new Derived()
 * } catch (error) {
 *   console.table(error)
 * }
 * ```
 */
export function sealed<T extends Class<object, MixinConstructorArgs>>(
  target: T,
  _: ClassDecoratorContext<T>,
): T {
  return class extends target {
    constructor(..._: MixinConstructorArgs) {
      super()
      throw new SealedClassExtentionError(target.name, this.constructor.name)
    }
  }
}
