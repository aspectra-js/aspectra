import { name } from '../package.json'
import { Context } from './context'
import { Strategy } from './lib/strategy'
import type { Class, UnknownArgs } from './types'

export class Metadata {
  private static readonly namespace = Symbol(`${name}.metadata`)

  public readonly contexts = new Set<Context>([Context.global])
  public strategy = Strategy.DEFAULT

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
