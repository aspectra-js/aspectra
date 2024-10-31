import { equal, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { contextualize, provide, provider } from 'aspectra'

const contextId = import.meta.filename

@contextualize(contextId)
@provider
class Provider {}

const providerId = 'custom_name'

@contextualize(contextId)
@provider(providerId)
class IdentifiedProvider {}

@contextualize(contextId)
class Providers {
  @provide(Provider)
  public readonly provider!: Provider

  @provide(Provider)
  public readonly otherProvider!: Provider

  @provide(providerId)
  public readonly identifiedProvider!: IdentifiedProvider
}

describe(import.meta.filename, () => {
  const { provider, otherProvider, identifiedProvider } = new Providers()

  test('should inject providers correctly', () => {
    ok(provider)
  })

  test('should inject named providers correctly', () => {
    ok(identifiedProvider)
  })

  test('injecting the same provider multiple times should return the same instance', () => {
    equal(provider, otherProvider)
  })
})
