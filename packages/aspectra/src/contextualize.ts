import { Context, type ContextId } from './internal/context'
import { Metadata } from './internal/metadata'
import type { Class, NonEmptyArray, UnknownArgs } from './types'

/**
 * # @contextualize
 *
 * Contexts serve as containers for managing providers. By default, providers
 * are stored in the global context (`Context.global`) and can be injected
 * anywhere using `@provide`. To limit provider availability to specific areas,
 * use the `@contextualize` decorator.
 *
 * This decorator enables precise control over dependency injection, supporting
 * modularity, security, and organized management by keeping certain providers
 * accessible only within designated contexts.
 *
 * #### Example
 *
 * In this example, we define two contexts: `DATABASE` and `ORDER`.
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
 *   public getById(id: number) {
 *     // run sql query
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
 *     const product = this.database.getById(id)
 *     // process order
 *   }
 * }
 *
 * @contextualize(ContextId.ORDER)
 * @application
 * class CommerceApplication {
 *   @provide(OrderProvider)
 *   private readonly order!: OrderProvider
 *
 *   // This will fail as `CommerceApplication` and `DatabaseProvider` have no shared contexts
 *   // @provide(DatabaseProvider)
 *   // private readonly database!: DatabaseProvider
 *
 *   public start() {
 *     this.order.process(1)
 *   }
 * }
 * ```
 *
 * ```mermaid
 * flowchart LR
 *     A[DatabaseProvider] <--> C0{DATABASE}
 *     C0 <--> B[OrderProvider]
 *     B <--> C1{ORDER}
 *     C1 <--> C[CommerceApplication]
 * ```
 *
 * <Callout>
 *   By assigning `DatabaseProvider` and `CommerceApplication` to different
 *   contexts, only `OrderProvider` can access `DatabaseProvider`, preserving
 *   strict boundaries between providers.
 * </Callout>
 */
export function contextualize<T>(...args: NonEmptyArray<Context | ContextId>) {
  return (
    target: Class<T, UnknownArgs>,
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
