import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import { name } from '~/package.json' assert { type: 'json' }

describe(import.meta.filename, () => {
  test(name, () => equal(name, 'aspectra'))
})
