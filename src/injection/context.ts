import { Container } from '#injection/container'
import { Metadata } from '#injection/metadata'
import type { Class, UnknownArgs } from '#types'

export type ContextId = PropertyKey

export class Context {
  public static readonly globalId = Symbol('context.global')
  public static readonly global = new Context()

  private static readonly contexts = new Map<ContextId, Context>([
    [Context.globalId, Context.global],
  ])
  public readonly container = new Container()

  public static getOrRegisterAll(cls: Class<unknown, UnknownArgs>) {
    const metadata = Metadata.fromClass(cls)
    const contexts = new Set<Context>()
    for (const contextId of metadata.contextIds) {
      if (Context.contexts.has(contextId)) {
        // biome-ignore lint/style/noNonNullAssertion: Checked for existence above
        const context = Context.contexts.get(contextId)!
        contexts.add(context)
      } else {
        const context = new Context()
        Context.contexts.set(contextId, context)
        contexts.add(context)
      }
    }
    return contexts
  }
}
