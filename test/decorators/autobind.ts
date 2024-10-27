import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import { autobind } from 'aspectra'

@autobind
class Test {
  constructor(private value: number) {}

  public get() {
    return this.value
  }

  public add(value: number) {
    this.value += value
  }
}

describe(import.meta.filename, () => {
  test(`should return initial value when retrieving - ${autobind.name}`, () => {
    const { get } = new Test(0)
    equal(get(), 0)
  })

  test(`should correctly increment value when method is passed around - ${autobind.name}`, () => {
    const test = new Test(0)
    const { add } = test
    add(2)
    equal(test.get(), 2)
  })

  test(`should increment value twice and retrieve updated value - ${autobind.name}`, () => {
    const { add, get } = new Test(0)
    add(1)
    add(2)
    equal(get(), 3)
  })

  test(`should handle positive initial value and increment correctly - ${autobind.name}`, () => {
    const { add, get } = new Test(10)
    equal(get(), 10)
    add(1)
    equal(get(), 11)
  })
})
