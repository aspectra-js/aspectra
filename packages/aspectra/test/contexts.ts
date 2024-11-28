import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contexts, contextualize, isolated, provider } from 'aspectra'

const contextIds = ['a', 'b'] as const

@provider
class Global {
  @contexts
  public readonly contexts!: ReadonlySet<Context>
}

@isolated
@contextualize(...contextIds)
class Contextualized {
  @contexts
  public readonly contexts!: ReadonlySet<Context>
}

describe(import.meta.filename, () => {
  test('should have global contexts', () => {
    const global = new Global()
    deepStrictEqual(
      Array.from(global.contexts).map(it => it.id),
      [Context.global.id],
    )
  })

  test('should have contextualized contexts', () => {
    const contextualized = new Contextualized()
    deepStrictEqual(
      Array.from(contextualized.contexts).map(it => it.id),
      contextIds,
    )
  })
})
