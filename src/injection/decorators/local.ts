import { AccessScope } from '#injection/access'
import { Metadata } from '#injection/metadata'
import type { ProviderClassType } from '#injection/provider'

/**
 * Marks a class as `@local`, restricting its access to specific contexts and
 * preventing it from being exposed globally.
 *
 * This decorator is intended to limit a provider's accessibility to only the
 * contexts specified via `@contextualize`. If a `@local` provider is not
 * associated with any context, it will be inaccessible.
 *
 * When applied, the provider’s `accessScope` is set to `AccessScope.LOCAL`,
 * ensuring it remains isolated from the global scope.
 *
 * @remarks
 * If a [`@local`](#local) provider is not paired with a context using
 * [`@contextualize`](#contextualize), it will trigger a runtime error as it
 * cannot be accessed by any consumers.
 *
 * @example
 * ```typescript
 * @local
 * @contextualize('custom_context')
 * @provider
 * class LocalService {
 *   // This service will only be accessible within 'custom_context'
 * }
 *
 * @contextualize('custom_context')
 * @provider
 * class CustomContext {
 *   // This service will be accessible in both 'custom_context' & global context
 * }
 *
 * @contextualize('custom_context')
 * @local
 * class LocalConsumer {
 *   // This consumer will only be able to access 'LocalService' within 'custom_context'
 *   // will not look up in global context
 *   @provide(LocalService)
 *   private readonly service!: LocalService
 * }
 * ```
 */
export function local(
  target: ProviderClassType,
  context: ClassDecoratorContext<typeof target>,
) {
  Metadata.fromContext(context).accessScope = AccessScope.LOCAL
}
