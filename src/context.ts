import { Container } from '#container'
import { Metadata } from '#metadata'
import type { Class } from '#types'

export type ContextId = PropertyKey

export class Context {
  public static readonly global = new Context()

  private static readonly contexts = new Map<ContextId, Context>()

  public static getOrRegister(cls: Class<unknown>): Context {
    const { contextId } = Metadata.fromClass(cls)
    if (!contextId) {
      return Context.global
    }
    if (!Context.contexts.has(contextId)) {
      const context = new Context()
      Context.contexts.set(contextId, context)
      return context
    }
    // biome-ignore lint/style/noNonNullAssertion: Checked for existence above
    return Context.contexts.get(contextId)!
  }

  public readonly container = new Container()
}
