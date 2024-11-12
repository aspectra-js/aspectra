import type { Context } from '../context'
import { Metadata } from '../metadata'

/**
 * # Origin
 *
 * Injects the context where it was instantiated. Powerful when combined with
 * `@isolated`.
 *
 * ```typescript
 * import { application, contextualize, origin, provide, provider } from 'aspectra'
 * import { type Context, isolated } from 'aspectra'
 *
 * enum ContextId {
 *   DATABASE = 'database',
 *   APPLICATION = 'application',
 * }
 *
 * @isolated
 * @provider
 * class LoggerProvider {
 *   @origin
 *   private readonly origin!: Context
 *
 *   public log(message: string) {
 *     console.log(`[${this.origin.id.toString()}]:`, message)
 *   }
 * }
 *
 * @contextualize(ContextId.DATABASE)
 * @provider
 * class DatabaseProvider {
 *   @provide(LoggerProvider)
 *   private readonly logger!: LoggerProvider
 *
 *   public connect() {
 *     this.logger.log('Connected to database')
 *   }
 * }
 *
 * @contextualize(ContextId.APPLICATION, ContextId.DATABASE)
 * @application
 * class Application {
 *   @provide(LoggerProvider)
 *   private readonly logger!: LoggerProvider
 *
 *   @provide(DatabaseProvider)
 *   private readonly database!: DatabaseProvider
 *
 *   public start() {
 *     this.logger.log('Starting application')
 *     this.database.connect()
 *   }
 * }
 * ```
 */
export function origin<T>(
  _: unknown,
  context: ClassFieldDecoratorContext<T, Context>,
): void {
  const metadata = Metadata.fromContext(context)
  metadata.injectionKeys.origin = context.name
}
