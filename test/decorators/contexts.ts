import { deepStrictEqual } from 'node:assert'
import { describe } from 'node:test'
import { test } from 'node:test'
import { type Context, contexts } from 'aspectra'
import { contextualize } from 'aspectra'
import { isolated } from 'aspectra'
import { Aspectra } from '../../src/aspectra'

const customContexts = ['a', 'b']

class Global {
  @contexts
  public readonly contexts!: ReadonlySet<Context>
}

@isolated
@contextualize(...customContexts)
class Contextualized {
  @contexts
  public readonly contexts!: ReadonlySet<Context>
}

describe(import.meta.filename, () => {
  test('should have global contexts', () => {
    const global = new Global()
    deepStrictEqual(
      global.contexts
        .values()
        .map(it => it.id)
        .toArray(),
      [Aspectra.GLOBAL_CONTEXT_ID],
    )
  })

  test('should have contextualized contexts', () => {
    const contextualized = new Contextualized()
    deepStrictEqual(
      contextualized.contexts
        .values()
        .map(it => it.id)
        .toArray(),
      customContexts,
    )
  })
})
