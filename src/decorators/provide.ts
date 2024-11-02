import { Context } from '../context'
import { Contract } from '../contract'
import { Metadata } from '../metadata'
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
    const name = context.name as keyof T
    context.addInitializer(function () {
      const contexts = Context.getAllVisible(this.constructor as UnknownClass)
      for (const context of contexts) {
        const resolved = context.container.resolve(
          provider,
          Metadata.fromClass(this.constructor as UnknownClass),
        )
        if (resolved) {
          this[name] = resolved as T[keyof T]
          return
        }
      }
      Contract.PROVIDER_NOT_FOUND.check(this[name], name, contexts)
    })
  }
}
