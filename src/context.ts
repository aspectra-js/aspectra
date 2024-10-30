import { Aspectra } from '#aspectra'
import { Container } from '#container'
import type { Class } from '#types'
import type { PrimitiveIdentifier } from '#types/identifier'

export type ContextIdentifier = PrimitiveIdentifier

export interface Contextualized extends Class<unknown> {
  [Aspectra.context]: ContextIdentifier
}

export class Context {
  public static readonly primary = new Context()

  public static isContextualized(cls: Class<unknown>): cls is Contextualized {
    return Aspectra.context in (cls as Contextualized)
  }

  private static readonly contexts = new Map<ContextIdentifier, Context>()

  public static get(cls: Class<unknown>): Context {
    if (Context.isContextualized(cls)) {
      if (!Context.contexts.has(cls[Aspectra.context])) {
        throw new Error(`Context ${String(cls[Aspectra.context])} not found`)
      }
      // biome-ignore lint/style/noNonNullAssertion: Checked for existence above
      return Context.contexts.get(cls[Aspectra.context])!
    }
    return Context.primary
  }

  public static register(identifier: ContextIdentifier): void {
    if (!Context.contexts.has(identifier)) {
      Context.contexts.set(identifier, new Context())
    }
  }

  private readonly container = new Container()
}
