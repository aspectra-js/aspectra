import { Context } from '../context'
import { ProviderNotFoundError } from '../lib/error'
import type { ProviderClassType } from '../provider'
import type { UnknownClass } from '../types'

/**
 * Inject a [`@provider`](#provider) into a class field.
 *
 * @remarks
 * Regardless of how many times it is injected, the same instance will be
 * returned each time.
 *
 * @example
 * ```typescript
 * class Providers {
 *   @provide(SampleProvider)
 *   // notice the `!` for definite assignment
 *   private readonly provider!: SampleProvider
 *
 *   // this will be the same instance as the `provider` above
 *   @provide(SampleProvider)
 *   private readonly second_provider!: SampleProvider
 * }
 * ```
 */
export function provide<T extends object, P>(provider: ProviderClassType) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    const name = context.name as keyof T
    context.addInitializer(function () {
      const contexts = Context.getRegistered(this.constructor as UnknownClass)
      for (const context of contexts) {
        const resolved = context.container.resolve(provider, context)
        if (resolved) {
          this[name] = resolved as T[keyof T]
          return
        }
      }
      throw new ProviderNotFoundError(provider.name, contexts)
    })
  }
}
