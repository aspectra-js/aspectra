import { Aspectra } from './aspectra'
import { Container } from './container'
import { Metadata } from './metadata'
import type { UnknownClass } from './types'

export type ContextId = PropertyKey

export class Context {
  public static readonly global = new Context(Aspectra.GLOBAL_CONTEXT_ID)

  private static readonly contexts = new Map<ContextId, Context>([
    [Context.global.id, Context.global],
  ])

  public readonly container: Container

  private constructor(public readonly id: ContextId) {
    this.container = new Container(this.id)
  }

  public static getAllVisible(cls: UnknownClass) {
    const metadata = Metadata.fromClass(cls)
    const contexts = new Set<Context>()
    for (const contextId of metadata.contextIds) {
      if (Context.contexts.has(contextId)) {
        // biome-ignore lint/style/noNonNullAssertion: Checked for existence above
        const context = Context.contexts.get(contextId)!
        contexts.add(context)
      }
    }
    return contexts
  }

  public static registerIfMissing(contextId: ContextId) {
    if (!Context.contexts.has(contextId)) {
      Context.contexts.set(contextId, new Context(contextId))
    }
  }

  public static getById(contextId: ContextId) {
    return Context.contexts.get(contextId)
  }
}
