import { deepStrictEqual, notEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { contextualize, isolated, provide, provider } from '#index'

const contextId1 = `${import.meta.filename}-context1`
const contextId2 = `${import.meta.filename}-context2`

@contextualize(contextId1)
@isolated
@provider
class IsolatedProvider {}

@contextualize(contextId1)
class Consumer1 {
  @provide(IsolatedProvider)
  public provider!: IsolatedProvider
}

@contextualize(contextId2)
class Consumer2 {
  @provide(IsolatedProvider)
  public provider!: IsolatedProvider
}

describe(import.meta.filename, () => {
  test('should create a new instance for each context', () => {
    const consumer1 = new Consumer1()
    const consumer2 = new Consumer2()

    notEqual(consumer1.provider, consumer2.provider)
  })

  test('should use the same instance within the same context', () => {
    const consumer1a = new Consumer1()
    const consumer1b = new Consumer1()

    deepStrictEqual(consumer1a.provider, consumer1b.provider)
  })
})
