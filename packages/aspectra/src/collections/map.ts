export class AspectraMap<K, V> extends Map<K, V> {
  public getOrPut(key: K, fallback: () => V): V {
    const current = this.get(key)
    if (current) {
      return current
    }
    const value = fallback()
    this.set(key, value)
    return value
  }
}
