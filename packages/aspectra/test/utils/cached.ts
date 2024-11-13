import { equal } from 'node:assert'
import { afterEach, describe, mock, test } from 'node:test'
import { cached } from '../../src/utils'

const duration = 5000

const mockFn = mock.fn()

class Test {
  @cached(duration) public square(num: number) {
    mockFn()
    return num ** 2
  }
}

describe(import.meta.filename, () => {
  afterEach(() => {
    mockFn.mock.resetCalls()
    mock.timers.reset()
    mock.reset()
  })

  test('should cache results', () => {
    const instance = new Test()
    for (let i = 0; i < 10; i++) {
      equal(instance.square(2), 2 ** 2)
    }
    equal(mockFn.mock.callCount(), 1)
  })

  test('should expire cache after duration', async () => {
    const instance = new Test()
    mock.timers.enable({
      apis: ['Date'],
    })
    equal(instance.square(3), 3 ** 2)
    equal(instance.square(3), 3 ** 2)
    mock.timers.tick(duration)
    equal(instance.square(3), 3 ** 2)
    equal(mockFn.mock.callCount(), 2)
  })
})
