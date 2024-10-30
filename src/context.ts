import { Aspectra } from '#aspectra'
import { Container } from '#container'
import type { Class } from '#types'
import type { PrimitiveIdentifier } from '#types/identifier'

export interface Contextualized extends Class<unknown> {
  readonly [Aspectra.context]: PrimitiveIdentifier
}

export class Context {
  private static readonly contexts = new Map<PrimitiveIdentifier, Context>()

  public static readonly primary = new Context()

  public static isContextualized(cls: Class<unknown>): cls is Contextualized {
    return Aspectra.context in (cls as Contextualized)
  }

  public static getOrRegister(cls: Class<unknown>): Context {
    if (Context.isContextualized(cls)) {
      const identifier = cls[Aspectra.context]
      if (!Context.contexts.has(identifier)) {
        const context = new Context()
        Context.contexts.set(identifier, context)
        return context
      }
      // biome-ignore lint/style/noNonNullAssertion: Checked for existence above
      return Context.contexts.get(cls[Aspectra.context])!
    }
    return Context.primary
  }

  public readonly container = new Container()
}
