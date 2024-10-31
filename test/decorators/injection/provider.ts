import { ok } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualized, provider } from 'aspectra'

const contextId = import.meta.filename

@contextualized(contextId)
@provider
class Provider {}

const identifier = 'custom_name'

@contextualized(contextId)
@provider(identifier)
class IdentifiedProvider {}

describe(import.meta.filename, () => {
  test('should create a provider', () => {
    const provider = Context.getOrRegister(Provider).container.resolve(Provider)
    ok(provider instanceof Provider)
  })

  test('should create a provider with identifier', () => {
    const provider =
      Context.getOrRegister(IdentifiedProvider).container.resolve(identifier)
    ok(provider instanceof IdentifiedProvider)
  })
})
