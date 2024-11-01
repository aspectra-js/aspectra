import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize, local, provide, provider } from '#index'

const context = 'contex'
const otherContext = 'other_context'

@contextualize(context)
@local
@provider
class Provider {}

@contextualize(context)
@local
class Consumer {
  @provide(Provider)
  public providerA!: Provider
}

describe(import.meta.filename, () => {
  test('provider should not be exposed to global', () => {
    deepStrictEqual(
      Context.getAllVisible(Provider),
      new Set([Context.getFromId(context)]),
    )
  })
  test('consumer should not be exposed to global', () => {
    deepStrictEqual(
      Context.getAllVisible(Provider),
      new Set([Context.getFromId(context)]),
    )
  })
})
