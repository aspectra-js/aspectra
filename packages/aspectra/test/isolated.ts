import { equal, notEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { contextualize, isolated, provide, provider } from 'aspectra'

const contextId1 = `${import.meta.filename}-context-1`
const contextId2 = `${import.meta.filename}-context-2`

@contextualize(contextId1, contextId2)
@isolated
@provider
class IsolatedProvider {}

@contextualize(contextId1)
class Consumer1 {
  @provide(IsolatedProvider)
  public readonly provider!: IsolatedProvider
}

@contextualize(contextId1)
class Consumer2 {
  @provide(IsolatedProvider)
  public readonly provider!: IsolatedProvider
}

@contextualize(contextId2)
class Consumer3 {
  @provide(IsolatedProvider)
  public readonly provider!: IsolatedProvider
}

describe(import.meta.filename, () => {
  test('should use the same instance within the same context (same class)', () => {
    equal(new Consumer1().provider, new Consumer1().provider)
  })

  test('should use the same instance within the same context (different class)', () => {
    equal(new Consumer1().provider, new Consumer2().provider)
  })

  test('should create a new instance for each context', () => {
    notEqual(new Consumer1().provider, new Consumer3().provider)
  })
})
