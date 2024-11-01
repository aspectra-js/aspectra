import { Metadata } from '#injection/metadata'
import { type ProviderClassType, ProviderScope } from '#injection/provider'
import { Contract } from '#internal/contract'

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
  Contract.MULTIPLE_PROVIDER_SCOPE_MODIFIER.check(
    target,
    metadata,
    isolated.name,
  )
  metadata.providerScope = ProviderScope.ISOALTED
}
