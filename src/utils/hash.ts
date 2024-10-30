import { name } from 'package.json'

export type Serializable =
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined
  | { [_: string]: Serializable }
  | Serializable[]
  | Date

export function serialize(value: Serializable): string {
  if (value === undefined) {
    return `__${name}_undefined__`
  }
  if (value === null) {
    return `__${name}_null__`
  }
  if (typeof value === 'bigint') {
    return `${value.toString()}n`
  }
  if (value instanceof Date) {
    return value.toISOString()
  }
  return JSON.stringify(value)
}
