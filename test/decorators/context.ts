import { equal, notEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Context } from 'aspectra'
import { Aspectra } from '#aspectra'
import { contextualized } from '#decorators/contextualized'

class Uncontextualized {}

@contextualized
class A {
  public static readonly [Aspectra.context] = A.name
}

@contextualized
class SameContextAsA {
  public static readonly [Aspectra.context] = A.name
}

@contextualized
class B {
  public static readonly [Aspectra.context] = B.name
}

describe(import.meta.filename, () => {
  test('should get primary context for uncontextualized', () => {
    equal(Context.get(Uncontextualized), Context.primary)
  })
  test('should register new contexts', () => {
    notEqual(Context.get(A), Context.get(B))
  })
  test('should register same context', () => {
    equal(Context.get(A), Context.get(SameContextAsA))
  })
})
