import type { Class } from '#types'

export type ContainerKey = string | symbol

class Container {
  private readonly bindings = new Map<ContainerKey, unknown>()

  public bind<T>(provider: Class<T, []>, key: ContainerKey) {
    if (this.bindings.has(key)) {
      throw new Error(`Provider ${key.toString()} already exists`)
    }
    this.bindings.set(key, Reflect.construct(provider, []))
  }

  public resolve<T>(key: ContainerKey) {
    if (!this.bindings.has(key)) {
      throw new Error(`Provider ${key.toString()} not found`)
    }
    return this.bindings.get(key) as T
  }
}

export const container = new Container()
