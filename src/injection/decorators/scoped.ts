import { AccessScope } from '#injection/access'
import { Metadata } from '#injection/metadata'
import type { ProviderClassType } from '#injection/provider'

/**
 * access only within the context, same instance. no expose to global
 */
export function scoped(
  target: ProviderClassType,
  context: ClassDecoratorContext<typeof target>,
) {
  Metadata.fromContext(context).accessScope = AccessScope.SCOPED
}
