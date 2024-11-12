import { MultipleScopeModifierError } from '../lib/error'
import { Scope } from '../lib/scope'
import { Metadata } from '../metadata'
import type { ProviderClassType } from '../provider'

/**
 * # Transient
 *
 * Scope-modifier decorator. Defines a provider as `@transient`, ensuring a new
 * instance each time the provider is injected.
 *
 * By default, providers are singletons, meaning a single instance is reused.
 * With `@transient`, a new instance is created upon each injection, which is
 * useful for stateless or temporary dependencies.
 *
 * Comparing `@transient` vs `@isolated`:
 *  - `@transient` creates a new instance each time it's requested.
 *  - `@isolated` creates one instance per context ("different context,
 *    different instance").
 *
 * ```typescript
 * import {
 *   application,
 *   Context,
 *   contextualize,
 *   provide,
 *   provider,
 *   transient,
 * } from 'aspectra'
 * import { randomUUID } from 'node:crypto'
 *
 * @transient
 * @provider
 * class Logger {
 *   public readonly id = randomUUID()
 * }
 *
 * @application
 * class Application {
 *   @provide(Logger)
 *   private readonly first!: Logger
 *
 *   @provide(Logger)
 *   private readonly second!: Logger
 *
 *   @provide(Logger)
 *   private readonly third!: Logger
 *
 *   public start() {
 *     console.table({
 *       first: this.first.id,
 *       second: this.second.id,
 *       third: this.third.id,
 *     })
 *   }
 * }
 * ```
 */
export function transient(
  target: ProviderClassType,
  context: ClassDecoratorContext<typeof target>,
): void {
  const metadata = Metadata.fromContext(context)
  if (metadata.scope !== Scope.DEFAULT) {
    throw new MultipleScopeModifierError(
      target.name,
      metadata.scope,
      transient.name,
    )
  }
  metadata.scope = Scope.TRANSIENT
}
