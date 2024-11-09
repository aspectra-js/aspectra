import { equal } from 'node:assert'
import { mock } from 'node:test'
import { describe } from 'node:test'
import { test } from 'node:test'
import { postconstruct } from 'aspectra/utils'

const mockFn = mock.fn()

class Test {
  @postconstruct
  public init() {
    mockFn()
  }
}

describe(import.meta.filename, () => {
  test('should run postconstruct method', () => {
    equal(mockFn.mock.callCount(), 0)
    new Test()
    equal(mockFn.mock.callCount(), 1)
  })
})
