import { Context } from '../context'
import { Provider } from '../provider'
import type { Class } from '../types'

/**
 * Registers a class as a provider, allowing it to be injected via
 * [`@provide`](#provide).
 *
 * @example
 * ```typescript
 * @provider
 * class DatabaseProvider {
 *   public getAll() {
 *     // ...
 *   }
 * }
 * ```
 */
export function provider<T>(
  target: Class<T, []>,
  context: ClassDecoratorContext<typeof target>,
): void {
  context.addInitializer(function () {
    const provider = Provider.fromClassType(target)
    for (const context of Context.of(this)) {
      context.container.register(provider, context)
    }
  })
}
