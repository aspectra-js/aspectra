import { Context, type ContextId } from '../context'
import { Metadata } from '../metadata'
import type { Class, UnknownArgs } from '../types'
import type { NonEmptyArray } from '../types'

/**
 * # @contextualize
 *
 * In `aspectra`, contexts serve as containers for managing providers. By default,
 * all providers are stored within the global context (`Context.global`), and
 * providers in the global context can be injected anywhere using the `@provide`
 * decorator.
 *
 * To restrict a provider to a specific context, use the `@contextualize`
 * decorator. This enables precise control over where dependencies can be
 * injected, ensuring that certain providers are only available within designated
 * parts of your application.
 *
 * #### Example
 *
 * Let's see an example where we have two contexts: `DATABASE` and `ORDER`.
 *
 * ```typescript
 * import { application, contextualize, provide, provider } from 'aspectra'
 *
 * enum ContextId {
 *   DATABASE = 'database',
 *   ORDER = 'order',
 * }
 *
 * @contextualize(ContextId.DATABASE)
 * @provider
 * class DatabaseProvider {
 *   public queryAll() {
 *     return [
 *       { id: 1, name: 'Laptop', price: 1000 },
 *       { id: 2, name: 'Smartphone', price: 500 },
 *     ]
 *   }
 * }
 *
 * @contextualize(ContextId.DATABASE, ContextId.ORDER)
 * @provider
 * class OrderProvider {
 *   @provide(DatabaseProvider)
 *   private readonly database!: DatabaseProvider
 *
 *   public process(id: number) {
 *     const product = this.database
 *       .queryAll()
 *       .find(it => it.id === id)
 *     if (product) {
 *       console.log(`[id: ${id}] Processing order for ${product.name}`)
 *     } else {
 *       console.log(`[id: ${id}] Product not found`)
 *     }
 *   }
 * }
 *
 * @contextualize(ContextId.ORDER)
 * @application
 * class CommerceApplication {
 *   @provide(OrderProvider)
 *   private readonly order!: OrderProvider
 *
 *   public start() {
 *     this.order.process(1)
 *     this.order.process(3)
 *   }
 * }
 * ```
 *
 * Let's break down the contexualization:
 * - `DatabaseProvider` & `OrderProvider` shares `DATABASE`
 * - `OrderProvider` & `CommerceApplication` shares `ORDER`
 *
 * <Callout>
 *     By restricting `DatabaseProvider` to the `DATABASE` context, we ensure it
 *     isn't exposed directly to `CommerceApplication`, and accessible only through
 *     `OrderProvider`. `Contexts` encapsulate the providers, ensuring secure and
 *     organized dependency management.
 * </Callout>
 */
export function contextualize(...args: NonEmptyArray<Context | ContextId>) {
  return (
    target: Class<object, UnknownArgs>,
    context: ClassDecoratorContext<typeof target>,
  ): void => {
    const metadata = Metadata.fromContext(context)
    metadata.contexts.clear()
    for (const arg of args) {
      if (arg instanceof Context) {
        metadata.contexts.add(arg)
      } else {
        const context = Context.getOrRegister(arg)
        metadata.contexts.add(context)
      }
    }
  }
}
