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
) {
  context.addInitializer(function () {
    const provider = Provider.createFromClass(target)
    Context.getAllVisible(this).forEach(context => {
      context.container.register(provider)
    })
  })
}
