import { name } from 'package.json'
import { Context, type ContextId } from '#injection/context'
import { ProviderScope } from '#injection/provider'
import type { Class, UnknownArgs } from '#types'

export class Metadata {
  // namespace for metadata to avoid collisions
  private static readonly namespace = Symbol(`${name}.metadata`)

  public readonly contextIds = new Set<ContextId>([Context.globalId])
  public providerScope = ProviderScope.SINGLETON

  public static fromClass<T>(target: Class<T, UnknownArgs>) {
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
}
