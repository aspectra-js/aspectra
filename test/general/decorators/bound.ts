import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import { bound } from '#index'

class Test {
  constructor(private value: number) {}

  @bound public get() {
    return this.value
  }

  @bound public incrementBy(value: number) {
    this.value += value
  }
}

describe(import.meta.filename, () => {
  test('should return initial value when retrieving', () => {
    const { get } = new Test(0)
    equal(get(), 0)
  })

  test('should correctly increment value when method is passed around', () => {
    const test = new Test(0)
    const { incrementBy } = test
    incrementBy(2)
    equal(test.get(), 2)
  })

  test('should increment value twice and retrieve updated value', () => {
    const { incrementBy, get } = new Test(0)
    incrementBy(1)
    incrementBy(2)
    equal(get(), 3)
  })

  test('should handle positive initial value and increment correctly', () => {
    const { incrementBy, get } = new Test(10)
    equal(get(), 10)
    incrementBy(1)
    equal(get(), 11)
  })
})
