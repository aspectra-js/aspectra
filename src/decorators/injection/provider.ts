import { Aspectra, Context } from 'aspectra'
import { Container, type PrimitiveContainerIdentifier } from '#container'
import type { Class } from '#types'

export function provider<T>(
  target: Class<T>,
  _: ClassDecoratorContext<typeof target>,
): void

export function provider(
  identifier: PrimitiveContainerIdentifier,
): typeof provider

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
 * class SampleProvider {
 *   // ...
 * }
 *
 * @provider('custom_name')
 * class NamedSampleProvider {
 *   // ...
 * }
 * ```
 */
export function provider<T>(arg: PrimitiveContainerIdentifier | Class<T>) {
  if (Container.isPrimitiveIdentifier(arg)) {
    return (target: Class<T>, _: ClassDecoratorContext<typeof target>) => {
      Context.getOrRegister(target).container.register(target, arg)
    }
  }
  Context.getOrRegister(arg).container.register(arg)
}
