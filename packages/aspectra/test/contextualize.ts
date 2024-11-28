import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize } from 'aspectra'
import type { UnknownClass } from 'aspectra/types'

class Uncontextualized {}

const contextA = 'context-a'
const contextB = 'context-b'

@contextualize(contextA)
class A1 {}

@contextualize(contextA)
class A2 {}

@contextualize(contextB)
class B {}

@contextualize(contextA, contextB)
class C {}

describe(import.meta.filename, () => {
  function getContextIds(cls: UnknownClass) {
    return Array.from(Context.of(cls)).map(context => context.id)
  }

  test('should get global contextA for uncontextualized', () => {
    deepStrictEqual(getContextIds(Uncontextualized), [Context.global.id])
  })

  test('should register same contextA for A1 and A2', () => {
    deepStrictEqual(getContextIds(A1), [contextA])
    deepStrictEqual(getContextIds(A2), [contextA])
  })

  test('should register no shared contextA between A1 and B', () => {
    deepStrictEqual(getContextIds(A1), [contextA])
    deepStrictEqual(getContextIds(B), [contextB])
  })

  test('should register multiple contexts for C', () => {
    deepStrictEqual(getContextIds(C), [contextA, contextB])
  })

  test('should register contexts in different order consistently', () => {
    deepStrictEqual(getContextIds(C), [contextA, contextB])
    deepStrictEqual(getContextIds(A1), [contextA])
  })
})
