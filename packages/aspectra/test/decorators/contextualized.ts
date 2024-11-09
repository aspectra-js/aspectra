import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize } from 'aspectra'

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

  test('should register same context for A1 and A2', () => {
    deepStrictEqual(Context.getRegistered(A1), new Set([Context.get(context)]))
    deepStrictEqual(Context.getRegistered(A2), new Set([Context.get(context)]))
  })

  test('should register no shared context between A1 and B', () => {
    deepStrictEqual(Context.getRegistered(A1), new Set([Context.get(context)]))
    deepStrictEqual(
      Context.getRegistered(B),
      new Set([Context.get(otherContext)]),
    )
  })

  test('should register multiple contexts for C', () => {
    deepStrictEqual(
      Context.getRegistered(C),
      new Set([Context.get(context), Context.get(otherContext)]),
    )
  })

  test('should register contexts in different order consistently', () => {
    deepStrictEqual(
      Context.getRegistered(C),
      new Set([Context.get(context), Context.get(otherContext)]),
    )
    deepStrictEqual(Context.getRegistered(A1), new Set([Context.get(context)]))
  })
})
