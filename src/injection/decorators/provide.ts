import { Context } from '#injection/context'
import type { ProviderClassType } from '#injection/provider'

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
export function provide<T extends object, P>(provider: ProviderClassType) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    context.addInitializer(function () {
      this[context.name as keyof T] = Context.getOrRegister(
        this.constructor as ProviderClassType,
      ).container.resolve(provider) as T[keyof T]
    })
  }
}
