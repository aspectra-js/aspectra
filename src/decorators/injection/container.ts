import type { Class } from '#types'

export type Identifier = string | symbol

export class Container {
  private readonly bindings = new Map<Identifier, unknown>()

  public bind<T>(provider: Class<T, []>, identifier: Identifier) {
    if (this.bindings.has(identifier)) {
      throw new Error(`Provider ${identifier.toString()} already exists`)
    }
    this.bindings.set(identifier, Reflect.construct(provider, []))
  }

  public resolve<T>(key: Identifier) {
    if (!this.bindings.has(key)) {
      throw new Error(`Provider ${key.toString()} not found`)
    }
    return this.bindings.get(key) as T
  }

  public static isContainerIdentifier(key: unknown): key is Identifier {
    return typeof key === 'string' || typeof key === 'symbol'
  }
}

export const container = new Container()
