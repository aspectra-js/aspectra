import {
  Container,
  type Identifier,
  container,
} from '#decorators/injection/container'
import type { Class } from '#types'

export function provide<T, P>(module: Class<P>): void
export function provide<T, P>(identifier: Identifier): void

/**
 * Inject a [`@provider`](#provider) into a class field.
 *
 * @remarks
 * If an `identifier` is provided (`string` or `symbol`), the key will be used to
 * resolve the dependency from the container. Otherwise, name of the class will
 * be used as an identifier.
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
export function provide<T, P>(arg: Class<P> | Identifier) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    context.addInitializer(function () {
      this[context.name as keyof T] = container.resolve(
        Container.isContainerIdentifier(arg) ? arg : arg.name,
      )
    })
  }
}
