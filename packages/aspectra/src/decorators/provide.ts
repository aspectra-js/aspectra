import { Context } from '../context'
import { ProviderNotFoundError } from '../lib/error'
import type { ProviderClassType } from '../provider'
import type { UnknownClass } from '../types'

/**
 * # @provide
 *
 * The @provide decorator injects providers as singletons. Each time a provider is
 * injected, `aspectra` returns the same instance, managing its lifecycle
 * automatically. This allows you to inject it wherever needed without worrying
 * about multiple instances.
 *
 * <Callout type='info'>
 *   You can customize this behavior by using the scope-modifier decorators, which
 *   will be covered in the later section.
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
