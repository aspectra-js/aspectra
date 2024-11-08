import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize } from '../../src'

class Uncontextualized {}

const context = 'contex'
const otherContext = 'other_context'

@contextualize(context)
class A1 {}

@contextualize(context)
class A2 {}

@contextualize(otherContext)
class B {}

@contextualize(context, otherContext)
class C {}

describe(import.meta.filename, () => {
  test('should get global context for uncontextualized', () => {
    deepStrictEqual(
      Context.getRegistered(Uncontextualized),
      new Set([Context.global]),
    )
  })
  test('should register same context', () => {
    deepStrictEqual(
      Context.getRegistered(A1).intersection(Context.getRegistered(A2)),
      new Set([Context.get(context)]),
    )
  })
  test('should register new contexts', () => {
    deepStrictEqual(
      Context.getRegistered(A1).intersection(Context.getRegistered(B)),
      new Set(),
    )
  })
  test('should register multiple contexts', () => {
    deepStrictEqual(
      Context.getRegistered(A1).intersection(Context.getRegistered(C)),
      new Set([Context.get(context)]),
    )
  })
  test('should register multiple contexts in different order', () => {
    deepStrictEqual(
      Context.getRegistered(C).intersection(Context.getRegistered(A1)),
      new Set([Context.get(context)]),
    )
  })
})
