import { equal } from 'node:assert'
import { describe, mock, test } from 'node:test'
import { application, provide, provider } from 'aspectra'

const startMock = mock.fn()
const providerConstructorMock = mock.fn()

@provider
class Provider {
  public constructor() {
    providerConstructorMock()
  }
}

@application
class Main {
  @provide(Provider)
  public readonly provider!: Provider

  public start() {
    startMock()
  }
}

describe(import.meta.filename, () => {
  test('should call `startMock`', () => {
    equal(startMock.mock.callCount(), 1)
  })

  test('should inject provider', () => {
    equal(providerConstructorMock.mock.callCount(), 1)
  })
})
