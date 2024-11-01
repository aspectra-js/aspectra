import { Context, type ContextId } from '#injection/context'
import { Metadata } from '#injection/metadata'
import type { Class, UnknownArgs } from '#types'

/**
 * Associates a class with one or more contexts, allowing for contextualized
 * dependency injection.
 *
 * When a class is decorated with `@contextualize`, it registers specified
 * `contextId`s to the class, ensuring that any dependencies injected into it
 * will be resolved within the assigned context(s).
 *
 * This decorator is especially useful for creating isolated instances of
 * providers across different contexts, such as during unit testing.
 *
 * @remarks
 * [Context.global] is the default context, and it is a special context that
 * contains all `providers` that have & have not been explicitly contextualized.
 *
 * @example
 * ```typescript
 * const contextId = 'custom_context';
 * const otherContextId = 'other_context';
 *
 * @contextualize(contextId)
 * @provider
 * class Provider {}
 *
 * // You can also contextualize into multiple contexts
 * @contextualize(contextId, otherContextId)
 * class Consumer {
 *   // This provider is resolved within the same context as `Provider`
 *   @provide(Provider)
 *   public readonly provider!: Provider;
 * }
 *
 * class OutOfContextConsumer {
 *   // This injection will fail at runtime as it defaults to the global context,
 *   // which does not contain the `Provider` instance from `custom_context`
 *   @provide(Provider)
 *   public readonly provider!: Provider;
 * }
 * ```
 */
export function contextualize(...contextIds: ContextId[]) {
  return (
    target: Class<object, UnknownArgs>,
    context: ClassDecoratorContext<typeof target>,
  ) => {
    const metadata = Metadata.fromContext(context)
    for (const contextId of contextIds) {
      metadata.contextIds.add(contextId)
      Context.registerIfMissing(contextId)
    }
  }
}
