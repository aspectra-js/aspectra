import { equal } from 'node:assert'
import { describe, mock, test } from 'node:test'
import { entry } from 'aspectra'

const mockFn = mock.fn()

@entry
class Main {
  public static main() {
    mockFn()
  }
}

describe(import.meta.filename, () => {
  test('should run main method', () => {
    equal(mockFn.mock.callCount(), 1)
  })
})
