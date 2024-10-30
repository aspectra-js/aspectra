import { equal } from 'node:assert'
import { afterEach, describe, mock, test } from 'node:test'
import { entry } from 'aspectra'

const mockFn = mock.fn()

@entry
class Main {
  public static main() {
    mockFn()
  }
}

describe(import.meta.filename, () => {
  afterEach(() => {
    mockFn.mock.resetCalls()
  })

  test('should run main method', () => {
    equal(mockFn.mock.callCount(), 1)
  })
})
