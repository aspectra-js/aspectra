import { Context, type PrimitiveId } from 'aspectra'
import type { Class } from '#types'
import { isPrimitiveId } from '#types/identifier'

export function provider<T>(
  target: Class<T>,
  _: ClassDecoratorContext<typeof target>,
): void

export function provider(id: PrimitiveId): typeof provider

/**
 * Registers a class as a provider, allowing it to be injected via
 * [`@provide`](#provide).
 *
 * @remarks
 * You can set a custom `identifier` (`string` or `symbol`).
 *
 * @example
 * ```typescript
 * @provider
 * class SampleProvider {}
 *
 * @provider('custom_name')
 * class NamedSampleProvider {}
 * ```
 */
export function provider<T>(
  arg: PrimitiveId | Class<T>,
  context?: ClassDecoratorContext<Class<T>>,
) {
  if (isPrimitiveId(arg)) {
    return (
      target: Class<T>,
      context: ClassDecoratorContext<typeof target>,
    ) => {
      context.addInitializer(function () {
        Context.getOrRegister(this).container.register(target, arg)
      })
    }
  }
  context?.addInitializer(function () {
    Context.getOrRegister(this).container.register(arg)
  })
}
