import { equal } from 'node:assert'
import { afterEach, describe, mock, test } from 'node:test'
import { memoized } from 'aspectra/utils'

const mockFn = mock.fn()

class Test {
  @memoized public square(num: number) {
    mockFn()
    return num ** 2
  }
}

describe(import.meta.filename, () => {
  afterEach(() => {
    mockFn.mock.resetCalls()
  })

  test('should memoize results', () => {
    const instance = new Test()
    for (let i = 0; i < 10; i++) {
      equal(instance.square(2), 2 ** 2)
    }
    equal(mockFn.mock.callCount(), 1)
  })

  test('should not memoize call with different args', () => {
    const instance = new Test()
    const numbers = [3, 4]
    numbers.forEach(num => {
      equal(instance.square(num), num ** 2)
    })
    equal(mockFn.mock.callCount(), numbers.length)
  })
})
