import { equal } from 'node:assert'
import { describe, mock, test } from 'node:test'
import { main } from 'aspectra'

const mockFn = mock.fn()

// biome-ignore lint/complexity/noStaticOnlyClass: test
class Main {
  @main public static start() {
    mockFn()
  }
}

describe(import.meta.filename, context => {
  test('should run main method', () => {
    equal(mockFn.mock.callCount(), 1)
  })
})
