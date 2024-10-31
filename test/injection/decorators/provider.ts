import { ok } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize, provider } from '#index'

const contextId = import.meta.filename

@contextualize(contextId)
@provider
class Provider {}

describe(import.meta.filename, () => {
  test('should create a provider', () => {
    ok(Context.getOrRegister(Provider).container.resolve(Provider))
  })
})
