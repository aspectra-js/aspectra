import { name } from '../package.json'
import { AspectraMap } from './collections/map'
import { Container } from './container'
import { Metadata } from './metadata'
import type { UnknownClass } from './types'

export type ContextId = PropertyKey

export class Context {
  public static readonly global = new Context(Symbol(`${name}.global_context`))

  private static readonly contexts = new AspectraMap<ContextId, Context>([
    [Context.global.id, Context.global],
  ])

  public readonly container = new Container()

  private constructor(public readonly id: ContextId) {}

  public static of(classType: UnknownClass): ReadonlySet<Context> {
    return Metadata.fromClass(classType).contexts
  }

  public static getOrRegister(contextId: ContextId): Context {
    return Context.contexts.getOrPut(contextId, () => {
      return new Context(contextId)
    })
  }
}
