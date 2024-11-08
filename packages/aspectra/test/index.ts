import { equal } from 'node:assert'
import { describe, test } from 'node:test'

describe(import.meta.filename, () => {
  test('aspectra', () => equal('aspectra', 'aspectra'))
})
