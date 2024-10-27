import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import { entry } from 'aspectra'

@entry
class Main {
  public static isOk = false

  public static main() {
    Main.isOk = true
  }
}

describe(import.meta.filename, () => {
  test('should run main method', () => {
    equal(Main.isOk, true)
  })
})
