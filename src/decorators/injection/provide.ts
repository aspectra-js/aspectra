import type { ContainerIdentifier } from '#container'
import { Context } from '#context'
import type { Class } from '#types'

export function provide<T, P>(
  provider: Class<P>,
): (_: unknown, context: ClassFieldDecoratorContext<T, P>) => void
export function provide<T, P>(
  identifier: ContainerIdentifier,
): (_: unknown, context: ClassFieldDecoratorContext<T, P>) => void

/**
 * Inject a [`@provider`](#provider) into a class field.
 *
 * @remarks
 * If an `identifier` is provided (`string` or `symbol`), this will be used to
 * resolve the dependency.
 *
 * Even if a provider is injected multiple times, **same** instance will
 * be returned every time.
 *
 * @example
 * ```typescript
 * class Providers {
 *   @provide(SampleProvider)
 *   // notice the `!` for definite assignment
 *   private readonly provider!: SampleProvider;
 *
 *   // with a custom name
 *   @provide('custom_name')
 *   private readonly namedProvider!: NamedProvider;
 *
 *   // this will be a same instance as the `provider` above
 *   @provide(SampleProvider)
 *   private readonly second_provider!: SampleProvider;
 * }
 * ```
 */
export function provide<T extends Class<unknown>, P>(
  arg: Class<P> | ContainerIdentifier,
) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    context.addInitializer(function () {
      this[context.name as keyof T] = Context.getOrRegister(
        this.constructor as Class<T>,
      ).container.resolve(arg)
    })
  }
}
