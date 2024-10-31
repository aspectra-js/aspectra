import type { Class, MixinConstructorArgs } from '#types'

/**
 * Makes a class singleton, ensuring that only one instance of the class is created.
 *
 * @example
 * ```typescript
 * @singleton
 * class Person {
 *   public readonly id = Math.random()
 * }
 *
 * const john = new Person()
 * const jane = new Person()
 *
 * john.id === jane.id // true
 * ```
 */
export function singleton<T extends Class<object, MixinConstructorArgs>>(
  target: T,
  _: ClassDecoratorContext<T>,
) {
  let instance: T | null = null
  return class extends target {
    constructor(...args: MixinConstructorArgs) {
      if (instance) {
        // biome-ignore lint/correctness/noConstructorReturn: Instance already created
        return instance
      }
      // biome-ignore lint/correctness/noUnreachableSuper: Will not reach this point if instance is already created
      super(...args)
      instance = this as unknown as T
    }
  }
}
