import type { Class } from '#types'

export type PrimitiveId = string | symbol
export type Id<T = unknown> = PrimitiveId | Class<T>

export function isPrimitiveId(id: unknown): id is PrimitiveId {
  return typeof id === 'string' || typeof id === 'symbol'
}

export function idToString(id: Id): string {
  return isPrimitiveId(id) ? id.toString() : id.name
}
