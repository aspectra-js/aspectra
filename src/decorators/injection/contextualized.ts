import type { ContextId } from '#context'
import { Metadata } from '#metadata'
import type { Class } from '#types'

/**
 * > Note: Read [`@provider`](#provider) and [`@provide`](#provide) first for
 * > better understanding.
 *
 * Injection is contextualized. [`@contextualized`] allows a manual control of
 * the context.
 *
 * `provider`s are stored in a `container`, which is registered in a `context`.
 * In general, you won't have to worry about this, as by default all `provider`s
 * are stored in a "primary context", however, there might be a case you want to
 * create an isolated context, for example, when you want to run tests
 * ([example](https://github.com/shunueda/aspectra/blob/main/test/decorators/injection/provide.ts)).
 *
 * @example
 * ```typescript
 * const contextId = 'custom_context'
 *
 * @contextualized(contextId)
 * @provider
 * class Provider {}
 *
 * @contextualized(contextId)
 * class Consumer {
 *   // this will be resolved from the same context as `Provider`
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 *
 * class OutOfContextConsumer {
 *   // this will fail at runtime as the context is different of that of `Provider`
 *   // `@provide` will attempt to resolve from the primary context (and fail)
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 * ```
 */
export function contextualized(contextId: ContextId) {
  return (
    target: Class<object>,
    context: ClassDecoratorContext<typeof target>,
  ) => {
    Metadata.fromContext(context).contextId = contextId
  }
}
