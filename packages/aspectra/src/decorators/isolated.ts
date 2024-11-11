import { MultipleScopeModifierError } from '../lib/error'
import { Scope } from '../lib/scope'
import { Metadata } from '../metadata'
import type { ProviderClassType } from '../provider'

/**
 * Marks a provider as `@isolated`, ensuring a unique instance of the provider
 * is created for each associated context.
 *
 * Useful for scenarios where the same provider class must yield distinct
 * instances based on different contexts.
 *
 * @example
 * ```typescript
 * @isolated
 * @provider
 * class Logger {
 *   public readonly id = generateId()
 * }
 *
 * @contextualize('database')
 * @provider
 * class Database {
 *   @provide(Logger)
 *   public logger!: Logger // Unique instance for 'database' context
 * }
 *
 * @contextualize('printer')
 * @provider
 * class Printer {
 *   @provide(Logger)
 *   public logger!: Logger // New unique instance for 'printer' context
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
