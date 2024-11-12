import { MultipleScopeModifierError } from '../lib/error'
import { Scope } from '../lib/scope'
import { Metadata } from '../metadata'
import type { ProviderClassType } from '../provider'

/**
 * # Isolated
 *
 * Scope-modifier decorator. Marks a provider as `isolated`, ensuring a unique
 * instance of the provider is created for each associated context.
 *
 * Useful for scenarios where the same provider class must yield distinct
 * instances based on different contexts.
 *
 * <Callout type="warning">
 *   Only one scope-modifier can be applied to a provider class. Multiple
 *   scope-modifier will result in a `MultipleScopeModifierError`.
 * </Callout>
 *
 * ```typescript
 * import {
 *   application,
 *   Context,
 *   contextualize,
 *   isolated,
 *   provide,
 *   provider
 * } from 'aspectra'
 * import { randomUUID } from 'node:crypto'
 *
 * @isolated
 * @provider
 * class Logger {
 *   public readonly id = randomUUID()
 * }
 *
 * @contextualize('database', Context.global)
 * @provider
 * class Database {
 *   @provide(Logger)
 *   public readonly logger!: Logger // First instance
 * }
 *
 * @contextualize('printer', Context.global)
 * @provider
 * class Printer {
 *   @provide(Logger)
 *   public readonly logger!: Logger // New instance
 * }
 *
 * @contextualize('printer', Context.global)
 * @provider
 * class OtherPrinter {
 *   @provide(Logger)
 *   public readonly logger!: Logger // Same instance as `Printer`
 * }
 *
 * @application
 * class Application {
 *   @provide(Database)
 *   private readonly database!: Database
 *
 *   @provide(Printer)
 *   private readonly printer!: Printer
 *
 *   @provide(OtherPrinter)
 *   private readonly otherPrinter!: OtherPrinter
 *
 *   public start() {
 *     console.table({
 *       database: this.database.logger.id,
 *       printer: this.printer.logger.id,
 *       otherPrinter: this.otherPrinter.logger.id
 *     })
 *   }
 * }
 * ```
 */
export function isolated(
  target: ProviderClassType,
  context: ClassDecoratorContext<typeof target>,
): void {
  const metadata = Metadata.fromContext(context)
  if (metadata.scope !== Scope.DEFAULT) {
    throw new MultipleScopeModifierError(
      target.name,
      metadata.scope,
      isolated.name,
    )
  }
  metadata.scope = Scope.ISOALTED
}
