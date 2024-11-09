export function pick<T>(object: T, keys: Array<keyof T>) {
  const result: Partial<T> = {}
  for (const key of keys) {
    if (object[key] === undefined) {
      continue
    }
    result[key] = object[key]
  }
  return result
}
