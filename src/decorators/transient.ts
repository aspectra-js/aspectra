import { MultipleScopeModifierError } from '../lib/error'
import { Strategy } from '../lib/strategy'
import { Metadata } from '../metadata'
import type { ProviderClassType } from '../provider'

/**
 * Defines a provider as `@transient`, ensuring a new instance is created
 * each time the provider is injected.
 *
 * By default, providers are singletons, meaning a single instance is reused.
 * With `@transient`, a new instance is created upon each injection, which is
 * useful for stateless or temporary dependencies.
 *
 * @remarks
 * The `@transient` decorator differs from `@isolated`:
 * - `@transient` creates a new instance each time it’s requested.
 * - `@isolated` creates one instance per context, providing the same instance
 *   within a given context but different instances across different contexts.
 *
 * @example
 * ```typescript
 * @provider
 * class Provider {}
 *
 * @transient
 * @provider
 * class TransientProvider {}
 *
 * class Consumer {
 *   @provide(Provider)
 *   private readonly provider!: Provider // Singleton instance
 *
 *   @provide(TransientProvider)
 *   private readonly transientProvider!: TransientProvider // New instance
 * }
 * ```
 */
export function transient(
  target: ProviderClassType,
  context: ClassDecoratorContext<typeof target>,
) {
  const metadata = Metadata.fromContext(context)
  if (metadata.strategy !== Strategy.DEFAULT) {
    throw new MultipleScopeModifierError(
      target.name,
      metadata.strategy,
      transient.name,
    )
  }
  metadata.strategy = Strategy.TRANSIENT
}
