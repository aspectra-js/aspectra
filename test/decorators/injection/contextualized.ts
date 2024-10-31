import { equal, notEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context } from '#context'
import { contextualized } from '#decorators/injection/contextualized'

class Uncontextualized {}

const context = 'contex'
const otherContext = 'other_context'

@contextualized(context)
class A {}

@contextualized(context)
class SameContextAsA {}

@contextualized(otherContext)
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
