import { name } from 'package.json'
import type { ContextId } from '#context'
import { ProviderScope } from '#provider'
import type { Class } from '#types'

export class Metadata {
  // namespace for metadata to avoid collisions
  private static readonly namespace = Symbol(`${name}.metadata`)

  public static fromClass<T>(target: Class<T>) {
    target[Symbol.metadata] ??= {}
    // biome-ignore lint/style/noNonNullAssertion: Assigned above
    target[Symbol.metadata]![Metadata.namespace] ??= new Metadata()
    // biome-ignore lint/style/noNonNullAssertion: Assigned above
    return target[Symbol.metadata]![Metadata.namespace]! as Metadata
  }

  public static fromContext(context: DecoratorContext) {
    context.metadata[Metadata.namespace] ??= new Metadata()
    return context.metadata[Metadata.namespace] as Metadata
  }

  public contextId?: ContextId
  public providerScope = ProviderScope.SINGLETON
}
