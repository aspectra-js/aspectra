import { notEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { contextualize, provide, provider, transient } from '../../src'

const contextId = import.meta.filename

@contextualize(contextId)
@transient
@provider
class Provider {}

@contextualize(contextId)
class Consumer {
  @provide(Provider)
  public provider!: Provider

  @provide(Provider)
  public otherProvider!: Provider
}

describe(import.meta.filename, () => {
  test('should create new provider every time', () => {
    const { provider, otherProvider } = new Consumer()
    notEqual(provider, otherProvider)
  })
})
