import { name } from 'package.json'
import type { ContextId } from '#injection/context'
import { ProviderScope } from '#injection/provider'
import type { Args, Class } from '#types'

export class Metadata {
  // namespace for metadata to avoid collisions
  private static readonly namespace = Symbol(`${name}.metadata`)

  public static fromClass<T>(target: Class<T, Args>) {
    if (!target[Symbol.metadata]) {
      Object.defineProperty(target, Symbol.metadata, {
        value: {} satisfies DecoratorMetadataObject,
        writable: false,
        configurable: true,
      })
    }
    // biome-ignore lint/style/noNonNullAssertion: Assigned above
    target[Symbol.metadata]![Metadata.namespace] ??= new Metadata()
    // biome-ignore lint/style/noNonNullAssertion: Assigned above
    return target[Symbol.metadata]![Metadata.namespace]! as Metadata
  }

  public static fromContext(context: DecoratorContext) {
    context.metadata[Metadata.namespace] ??= new Metadata()
    return context.metadata[Metadata.namespace] as Metadata
  }

  // initialize at [Context::getOrRegister] to avoid circular dependency
  public readonly contextIds = new Set<ContextId>()
  public providerScope = ProviderScope.SINGLETON
}
