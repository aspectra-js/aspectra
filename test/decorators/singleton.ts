import { deepStrictEqual, equal } from 'node:assert'
import { describe, test } from 'node:test'
import { singleton } from 'aspectra'

@singleton
class Test {
  public readonly value = Math.random()
}

describe(import.meta.filename, () => {
  test('should return the same instance', () => {
    const a = new Test()
    const b = new Test()
    equal(a, b)
    deepStrictEqual(a, b)
  })
})
