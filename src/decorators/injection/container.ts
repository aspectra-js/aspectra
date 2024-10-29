import type { Class } from '#types'

export type BindingsIdentifier = string | symbol

export class Container {
  private readonly bindings = new Map<BindingsIdentifier, unknown>()

  public bind<T>(provider: Class<T, []>, identifier: BindingsIdentifier) {
    if (this.bindings.has(identifier)) {
      throw new Error(`Provider ${identifier.toString()} already exists`)
    }
    this.bindings.set(identifier, Reflect.construct(provider, []))
  }

  public resolve<T>(key: BindingsIdentifier) {
    if (!this.bindings.has(key)) {
      throw new Error(`Provider ${key.toString()} not found`)
    }
    return this.bindings.get(key) as T
  }

  public static isContainerIdentifier(key: unknown): key is BindingsIdentifier {
    return typeof key === 'string' || typeof key === 'symbol'
  }
}

export const container = new Container()
