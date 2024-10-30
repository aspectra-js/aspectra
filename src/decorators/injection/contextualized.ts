import type { Contextualized } from '#context'
import type { Class } from '#types'

/**
 * Injection is contextualized. This allows a manual control of the context.
 * (Note: Read [`@provider`](#provider) and [`@provide`](#provide) first for
 * better understanding.)
 *
 * `provider`s are stored in a `container`, which is registered in a `context`.
 * You won't have to worry about this. By default, all `provider`s are stored
 * in a primary context, however, there might be a case you want to create an
 * isolated context; for example, when you want to run tests
 * ([Example](https://github.com/shunueda/aspectra/blob/main/test/decorators/injection/provide.ts)).
 *
 * @remarks
 * Use of this decorator is optional, even if you want to manually controll the
 * context. Just like the example below, you can add a static field
 * `[Aspectra.context]`. However, `@contextualized` will check for the existence
 * of this field at compile time, so it is recommended for better type safety.
 *
 * @example
 * ```typescript
 * const context = 'custom_context'
 *
 * @contextualized
 * @provider
 * class Provider {
 *   public static readonly [Aspectra.context] = context
 * }
 *
 * @contextualized
 * class Consumer {
 *   public static readonly [Aspectra.context] = context
 *
 *   // this will be resolved from the same context as `Provider`
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 *
 * class OutOfContextConsumer {
 *   // this will fail at runtime as the context is different of that of `Provider`
 *   // `@provide` will attemp to resolve from the primary context (and fail)
 *   @provide(Provider)
 *   public readonly provider!: Provider
 * }
 * ```
 */
export function contextualized<T>(
  target: Class<T> & Contextualized,
  _: ClassDecoratorContext<typeof target>,
) {}
