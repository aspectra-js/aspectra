import type { ContextId } from '#injection/context'
import { Metadata } from '#injection/metadata'
import type { Args, Class } from '#types'

/**
 * > Note: Read [`@provider`](#provider) and [`@provide`](#provide) first for
 * > better understanding.
 *
 * Injection is contextualized. `@contextualize` allows a manual control of
 * the context.
 *
 * `provider`s are stored in a `container`, which is registered in a `context`.
 * In general, you won't have to worry about this, as by default all `provider`s
 * are stored in a "global context", however, there might be a case you want to
 * create an isolated context, for example, when you want to run tests
 * ([example](https://github.com/shunueda/aspectra/blob/main/test/decorators/injection/provide.ts)).
 *
 * @example
 * ```typescript
 * const contextId = 'custom_context'
 *
 * @contextualize(contextId)
 * @provider
 * class Provider {}
 *
 * @contextualize(contextId)
 * class Consumer {
 *   // this will be resolved from the same context as `Provider`
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 *
 * class OutOfContextConsumer {
 *   // this will fail at runtime as the context is different of that of `Provider`
 *   // `@provide` will attempt to resolve from the global context (and fail)
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 * ```
 */
export function contextualize(...contextIds: ContextId[]) {
  return (
    target: Class<object, Args>,
    context: ClassDecoratorContext<typeof target>,
  ) => {
    const metadata = Metadata.fromContext(context)
    for (const contextId of contextIds) {
      metadata.contextIds.add(contextId)
    }
  }
}
