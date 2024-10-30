import type { Class } from '#types'

export type PrimitiveIdentifier = string | symbol
export type Identifier<T = unknown> = PrimitiveIdentifier | Class<T>
