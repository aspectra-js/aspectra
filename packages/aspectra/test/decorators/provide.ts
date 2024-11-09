import { equal, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { contextualize, provide, provider } from 'aspectra'

const contextId = import.meta.filename

@contextualize(contextId)
@provider
class Provider {}

@contextualize(contextId)
class Providers {
  @provide(Provider)
  public readonly provider!: Provider

  @provide(Provider)
  public readonly otherProvider!: Provider
}

describe(import.meta.filename, () => {
  const { provider, otherProvider } = new Providers()

  test('should inject providers correctly', () => {
    ok(provider)
  })

  test('injecting the same provider multiple times should return the same instance', () => {
    equal(provider, otherProvider)
  })
})
