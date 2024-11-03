import { MultipleScopeModifierError } from '../error'
import { Strategy } from '../lib/strategy'
import { Metadata } from '../metadata'
import type { ProviderClassType } from '../provider'

/**
 * All providers are by default `singleton`, meaning they are instantiated
 * once and reused. However, [`@transient`](#transient) classes will be
 * instantiated every time they are requested.
 *
 * @remarks
 * Similar to [`@isolated`](#isolated), but the difference is that
 * [`transient`](#transient) creates a new instance every time while
 * [`isolated`](#isolated) creates a new instance **per context**
 * (meaning "different context, different instance").
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
 * class Providers {
 *   @provide(Provider)
 *   private readonly provider!: Provider
 *
 *   @provide(Provider)
 *   private readonly otherProvider!: Provider
 *
 *   // ^ These will be the same instance (`singleton`)
 *
 *   @provide(TransientProvider)
 *   private readonly transientProvider!: TransientProvider
 *
 *   @provide(TransientProvider)
 *   private readonly otherTransientProvider!: TransientProvider
 *
 *   // ^ These will be different instances (`transient`)
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
