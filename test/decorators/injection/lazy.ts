import { equal } from 'node:assert'
import { describe, mock, test } from 'node:test'
import { contextualize, provide, provider } from 'aspectra'
import { lazy } from '#injection/decorators/lazy'

const contextId = import.meta.filename

const mockFn = mock.fn()

@contextualize(contextId)
@lazy
@provider
class Provider {
  constructor() {
    mockFn()
  }
}

@contextualize(contextId)
class Consumer {
  @provide(Provider)
  public provider!: Provider

  @provide(Provider)
  public otherProvider!: Provider
}

describe(import.meta.filename, () => {
  test('should not create at initialization', () => {
    equal(mockFn.mock.callCount(), 0)
  })

  test('should create new provider on access', () => {
    new Consumer()
    equal(mockFn.mock.callCount(), 1)
  })

  test('should not create new provider every time', () => {
    const { provider, otherProvider } = new Consumer()
    equal(provider, otherProvider)
  })
})
