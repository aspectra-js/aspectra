import { Context, type ContextId } from '#context'
import type { Class } from '#types'
import type { Id } from '#types/identifier'

export function provide<T, P>(
  provider: Class<P>,
): (_: unknown, context: ClassFieldDecoratorContext<T, P>) => void
export function provide<T, P>(
  contextId: ContextId,
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
export function provide<T extends Class<unknown>, P>(arg: Id<P>) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    context.addInitializer(function () {
      this[context.name as keyof T] = Context.getOrRegister(
        this.constructor as Class<T>,
      ).container.resolve(arg)
    })
  }
}
