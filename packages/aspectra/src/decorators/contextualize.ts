import { Context, type ContextId } from '../context'
import { Metadata } from '../metadata'
import type { Class, UnknownArgs } from '../types'
import type { NonEmptyArray } from '../types'

/**
 * Associates a class with one or more specific contexts, enabling contextualized
 * dependency injection.
 *
 * When combined with other decorators, this allows for fine-grained control
 * over the scope of a provider.
 *
 * <div align='center'>
 *   <img src='assets/context-control.svg' alt='context-controlled-provider'>
 * </div>
 *
 * @example
 * ```typescript
 * const contextId = 'custom_context'
 * const otherContextId = 'other_context'
 *
 * @contextualize(contextId)
 * @provider
 * class Provider {}
 *
 * // Multiple context associations
 * @contextualize(contextId, otherContextId)
 * class Consumer {
 *   // This provider is resolved within the same context as `Provider`
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 *
 * class OutOfContextConsumer {
 *   // Fails at runtime as it defaults to the global context,
 *   // which lacks the `Provider` instance from `custom_context`
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 * ```
 */
export function contextualize(...args: NonEmptyArray<Context | ContextId>) {
  return (
    target: Class<object, UnknownArgs>,
    context: ClassDecoratorContext<typeof target>,
  ) => {
    const metadata = Metadata.fromContext(context)
    metadata.contexts.clear()
    for (const arg of args) {
      if (arg instanceof Context) {
        metadata.contexts.add(arg)
      } else {
        const context = Context.registerIfMissing(arg)
        metadata.contexts.add(context)
      }
    }
  }
}
