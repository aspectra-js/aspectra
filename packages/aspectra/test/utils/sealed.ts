import { throws } from 'node:assert'
import { describe, test } from 'node:test'
import { sealed } from '../../src/utils'

@sealed
class Base {}

class Derived extends Base {}

describe(import.meta.filename, () => {
  test('should be sealed', () => {
    throws(() => {
      new Derived()
    })
  })
})
