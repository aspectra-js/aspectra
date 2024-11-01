import { AccessScope } from '#injection/access'
import { Metadata } from '#injection/metadata'
import type { ProviderClassType } from '#injection/provider'

/**
 * different context, different instance
 */
export function isolated(
  target: ProviderClassType,
  context: ClassDecoratorContext<typeof target>,
) {
  Metadata.fromContext(context).accessScope = AccessScope.ISOLATED
}
