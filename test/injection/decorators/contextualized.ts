import { equal, notEqual, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize } from '#index'

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
  test('should get global context for uncontextualized', () => {
    ok(Context.getAllVisible(Uncontextualized))
  })
  test('should register new contexts', () => {
    notEqual(Context.getAllVisible(A), Context.getAllVisible(B))
  })
  test('should register same context', () => {
    equal(
      Context.getAllVisible(A).intersection(
        Context.getAllVisible(SameContextAsA),
      ).size,
      2,
    )
  })
})
