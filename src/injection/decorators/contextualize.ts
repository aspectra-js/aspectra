import { Context, type ContextId } from '#injection/context'
import { Metadata } from '#injection/metadata'
import type { Class, UnknownArgs } from '#types'

/**
 * Associates a class with one or more contexts, allowing for contextualized
 * dependency injection.
 *
 * | Decorator                 | Scope              | Description                                                                                      | Global Exposure | Instance Behavior                                      |
 * |---------------------------|--------------------|--------------------------------------------------------------------------------------------------|-----------------|--------------------------------------------------------|
 * | [`@provider (default)`](#provider) | Global             | Registers the class as a provider accessible in the global context.                              | Yes             | Singleton by default; shared globally                  |
 * | [`@contextualize`](#contextualize) | Global + Context   | Exposes the provider in the global context and any specified contexts.                           | Yes             | Singleton across specified contexts and globally       |
 * | [`@local`](#local)                 | Local Context Only | Restricts the provider to specific contexts, inaccessible from the global scope.                 | No              | Singleton within each specified context                |
 * | [`@isolated`](#isolated)           | Context-Scoped     | Creates an independent instance for each context, preventing sharing between contexts.           | No              | Unique instance for each context                       |
 * | [`@scoped`](#scoped)               | Context-Only       | Limits access to the specified context, with a single instance reused within that context only.  | No              | Singleton within the specific context, no global scope |
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
