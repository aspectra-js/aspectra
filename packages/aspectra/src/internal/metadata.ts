import { name } from '../../package.json'
import type { Class, UnknownArgs } from '../types'
import { Context } from './context'
import { Scope } from './lib/scope'

interface InjectionKeys {
  origin?: PropertyKey
}

export class Metadata {
  private static readonly namespace = Symbol(`${name}.metadata`)

  public readonly contexts = new Set<Context>([Context.global])
  public scope = Scope.DEFAULT
  public readonly injectionKeys: InjectionKeys = {}

  public static fromClass<T>(target: Class<T, UnknownArgs>): Metadata {
    // biome-ignore lint/suspicious/noAssignInExpressions: handled properly
    const metadata = (target[Symbol.metadata] ??= {
      value: {} as DecoratorMetadataObject,
      writable: false,
      configurable: true,
    })
    // biome-ignore lint/suspicious/noAssignInExpressions: handled properly
    return (metadata[Metadata.namespace] ??= new Metadata()) as Metadata
  }

  public static fromContext(context: DecoratorContext): Metadata {
    context.metadata[Metadata.namespace] ??= new Metadata()
    return context.metadata[Metadata.namespace] as Metadata
  }
}
