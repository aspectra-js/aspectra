import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import { autobind } from 'aspectra'

@autobind
class Test {
  constructor(private value: number) {}

  public get() {
    return this.value
  }

  public increment() {
    this.value++
  }
}

describe(import.meta.filename, () => {
  test(`should return initial value when retrieving - @${autobind.name}`, () => {
    const { get } = new Test(0)
    equal(get(), 0)
  })

  test(`should correctly increment value when method is passed around - @${autobind.name}`, () => {
    const test = new Test(0)
    const { increment } = test
    increment()
    equal(test.get(), 1)
  })

  test(`should increment value twice and retrieve updated value - @${autobind.name}`, () => {
    const { increment, get } = new Test(0)
    increment()
    increment()
    equal(get(), 2)
  })

  test(`should handle positive initial value and increment correctly - @${autobind.name}`, () => {
    const { increment, get } = new Test(10)
    equal(get(), 10)
    increment()
    equal(get(), 11)
  })
})
