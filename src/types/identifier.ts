import type { Class } from '#types'

export type PrimitiveIdentifier = string | symbol
export type Identifier = PrimitiveIdentifier | Class<unknown>
