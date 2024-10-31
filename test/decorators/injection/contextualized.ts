import { equal, notEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize } from 'aspectra'

class Uncontextualized {}

const context = 'contex'
const otherContext = 'other_context'

@contextualize(context)
class A {}

@contextualize(context)
class SameContextAsA {}

@contextualize(otherContext)
class B {}

describe(import.meta.filename, () => {
  test('should get primary context for uncontextualized', () => {
    equal(Context.getOrRegister(Uncontextualized), Context.primary)
  })
  test('should register new contexts', () => {
    notEqual(Context.getOrRegister(A), Context.getOrRegister(B))
  })
  test('should register same context', () => {
    equal(Context.getOrRegister(A), Context.getOrRegister(SameContextAsA))
  })
})
