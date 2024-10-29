import {
  Container,
  type Identifier,
  container,
} from '#decorators/injection/container'
import type { Class } from '#types'

export function provider<T>(
  target: Class<T>,
  _: ClassDecoratorContext<typeof target>,
): void
export function provider(identifier: Identifier): typeof provider

/**
 * Registers a class as a provider, allowing it to be injected via
 * [@provide](#provide).
 *
 * @remarks
 * You can set a custom `identifier` (`string` or `symbol`). Otherwise,
 * name of the class will be used as an identifier.
 *
 * @example
 * ```typescript
 * @provider
 * export class SampleProvider {
 *   // ...
 * }
 *
 * @provider('custom_name')
 * export class NamedSampleProvider {
 *   // ...
 * }
 * ```
 */
export function provider<T>(arg: Identifier | Class<T>) {
  if (Container.isContainerIdentifier(arg)) {
    return (target: Class<T>, _: ClassDecoratorContext<typeof target>) => {
      container.bind(target, arg)
    }
  }
  container.bind(arg, arg.name)
}
