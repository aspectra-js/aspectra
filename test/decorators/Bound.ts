import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import { bound } from 'aspectra'

class Test {
  constructor(private value: number) {}

  @bound public get() {
    return this.value
  }

  @bound public increment() {
    this.value++
  }
}

describe(import.meta.filename, () => {
  test(`should return initial value when retrieving - @${bound.name}`, () => {
    const { get } = new Test(0)
    equal(get(), 0)
  })

  test(`should correctly increment value when method is passed around - @${bound.name}`, () => {
    const test = new Test(0)
    const { increment } = test
    increment()
    equal(test.get(), 1)
  })

  test(`should increment value twice and retrieve updated value - @${bound.name}`, () => {
    const { increment, get } = new Test(0)
    increment()
    increment()
    equal(get(), 2)
  })

  test(`should handle positive initial value and increment correctly - @${bound.name}`, () => {
    const { increment, get } = new Test(10)
    equal(get(), 10)
    increment()
    equal(get(), 11)
  })
})
