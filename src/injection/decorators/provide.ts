import { Context } from '#context'
import type { Class } from '#types'

/**
 * Inject a [`@provider`](#provider) into a class field.
 *
 * @remarks
 * This decorator injects a provider into the specified class field. If injected
 * multiple times, **the same** instance will be returned each time.
 *
 * @example
 * ```typescript
 * class Providers {
 *   @provide(SampleProvider)
 *   // notice the `!` for definite assignment
 *   private readonly provider!: SampleProvider;
 *
 *   // this will be the same instance as the `provider` above
 *   @provide(SampleProvider)
 *   private readonly second_provider!: SampleProvider;
 * }
 * ```
 */
export function provide<T extends object, P>(provider: Class<P>) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    context.addInitializer(function () {
      this[context.name as keyof T] = Context.getOrRegister(
        this.constructor as Class<T>,
      ).container.resolve(provider)
    })
  }
}
