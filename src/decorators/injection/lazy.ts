import { Metadata } from '#metadata'
import { ProviderScope } from '#provider'
import type { Class } from '#types'

export function lazy<T>(
  target: Class<T>,
  context: ClassDecoratorContext<typeof target>,
) {
  Metadata.fromContext(context).providerScope = ProviderScope.LAZY
}
