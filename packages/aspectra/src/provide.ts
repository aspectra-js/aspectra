import { Context } from './internal/context'
import { ProviderNotFoundError } from './internal/lib/error'
import type { ProviderClassType } from './internal/provider'
import type { UnknownClass } from './internal/types'

/**
 * # @provide
 *
 * The `@provide` decorator injects providers into the class field as a
 * "singleton", meaning the same instance is shared across all injections. This
 * allows you to inject the provider wherever needed, without having to worry
 * about creating multiple instances.
 *
 * <Callout type='info'>
 *   You can customize this behavior using scope-modifier decorators, such as
 *   `@transient` and `@isolated`, which allow more granular control over the
 *   lifecycle and scope of injected instances. These will be covered in a
 *   later section.
 * </Callout>
 *
 * #### Example
 *
 * ```typescript filename='src/index.ts'
 * import { application, provide, provider } from 'aspectra'
 *
 * @provider
 * export class Database {
 *   private constructor() {
 *     console.log(`I'm only called once!`)
 *   }
 *
 *   public getAll() {
 *     return ['item1', 'item2']
 *   }
 * }
 *
 * @application
 * class Application {
 *   @provide(Database)
 *   private readonly database!: Database
 *
 *   @provide(Database)
 *   private readonly other!: Database // same instance as `database`
 *
 *   public start() {
 *     console.log(this.database.getAll())
 *   }
 * }
 * ```
 */
export function provide<T extends object, P>(provider: ProviderClassType<P>) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>): void => {
    const name = context.name as keyof T
    context.addInitializer(function () {
      const contexts = Context.of(this.constructor as UnknownClass)
      for (const context of contexts) {
        const resolved = context.container.resolve(provider, context)
        if (resolved) {
          this[name] = resolved as T[keyof T]
          return
        }
      }
      throw new ProviderNotFoundError(provider.name, contexts)
    })
  }
}
