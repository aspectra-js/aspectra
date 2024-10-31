import { Context } from '#index'
import type { Class } from '#types'

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
    Context.getOrRegister(this).container.register(target)
  })
}
