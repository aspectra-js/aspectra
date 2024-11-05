import { Context, type ContextId } from '../context'
import { Metadata } from '../metadata'
import type { Class, UnknownArgs } from '../types'

/**
 * Associates a class with one or more contexts, allowing for contextualized
 * dependency injection.
 *
 * With a combination with other decorators, you can have a fine-grained control
 * over the scope of a provider.
 *
 * <div align='center'>
 *   <img src='assets/context-control.svg' alt='context-controlled-provider'>
 * </div>
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
export function contextualize(...contexts: (Context | ContextId)[]) {
  return (
    target: Class<object, UnknownArgs>,
    context: ClassDecoratorContext<typeof target>,
  ) => {
    const metadata = Metadata.fromContext(context)
    metadata.contextIds.clear()
    for (const context of contexts) {
      if (context instanceof Context) {
        metadata.contextIds.add(context.id)
      } else {
        metadata.contextIds.add(context)
        Context.registerIfMissing(context)
      }
    }
  }
}
