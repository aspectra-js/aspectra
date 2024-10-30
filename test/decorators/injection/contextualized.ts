import { equal, notEqual } from 'node:assert'
import { describe, test } from 'node:test'
import { Aspectra } from '#aspectra'
import { contextualized } from '#decorators/injection/contextualized'
import { Context } from '#index'

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
    equal(Context.getOrRegister(Uncontextualized), Context.primary)
  })
  test('should register new contexts', () => {
    notEqual(Context.getOrRegister(A), Context.getOrRegister(B))
  })
  test('should register same context', () => {
    equal(Context.getOrRegister(A), Context.getOrRegister(SameContextAsA))
  })
})
