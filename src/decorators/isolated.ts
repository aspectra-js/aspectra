import { MultipleScopeModifierError } from '../lib/error'
import { Strategy } from '../lib/strategy'
import { Metadata } from '../metadata'
import type { ProviderClassType } from '../provider'

/**
 * Marks a provider as `@isolated`, ensuring that a unique instance is created
 * for each context.
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
 *   public logger!: Logger // first instance
 * }
 *
 * @contextualize('printer')
 * @provider
 * class Printer {
 *   @provide(Logger)
 *   public logger!: Logger // new instance
 * }
 * ```
 */
export function isolated(
  target: ProviderClassType,
  context: ClassDecoratorContext<typeof target>,
) {
  const metadata = Metadata.fromContext(context)
  if (metadata.strategy !== Strategy.DEFAULT) {
    throw new MultipleScopeModifierError(
      target.name,
      metadata.strategy,
      isolated.name,
    )
  }
  metadata.strategy = Strategy.ISOALTED
}
