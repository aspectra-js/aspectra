import { equal } from 'node:assert'
import { afterEach, describe, mock, test } from 'node:test'
import { main } from 'aspectra/utils'

const mockFn = mock.fn()

class Main {
  @main public static start() {
    mockFn()
  }
}

describe(import.meta.filename, context => {
  afterEach(() => {
    mockFn.mock.resetCalls()
  })

  test('should run main method', () => {
    equal(mockFn.mock.callCount(), 1)
  })
})
