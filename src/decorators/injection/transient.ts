import { Metadata } from '#metadata'
import { ProviderScope } from '#provider'
import type { Class } from '#types'

export function transient<T>(
  target: Class<T>,
  context: ClassDecoratorContext<typeof target>,
) {
  Metadata.fromContext(context).providerScope = ProviderScope.TRANSIENT
}
