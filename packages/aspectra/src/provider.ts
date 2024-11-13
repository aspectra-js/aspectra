import { Context } from './internal/context'
import { Provider } from './internal/provider'
import type { Class } from './internal/types'

/**
 * # @provider
 *
 * The `@provider` decorator registers a class as a service provider within the
 * application. Providers encapsulate functionality, such as a database
 * connection, which can be injected wherever needed using the `@provide`
 * decorator.
 *
 * #### Example
 *
 * ```typescript filename="src/providers/database.ts"
 * import { provider } from 'aspectra'
 *
 * @provider
 * export class Database {
 *   public connect() {
 *     console.log('Connecting to the database')
 *   }
 *
 *   public getAll() {
 *     return ['item1', 'item2']
 *   }
 *
 *   public close() {
 *     console.log('Closing the database connection')
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
