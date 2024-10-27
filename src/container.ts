import type { Class } from '#types'

class Container {
  private bindings = new Map<string, unknown>()

  public bind<T>(id: string, provider: Class<T, []>) {
    if (this.bindings.has(id)) {
      throw new Error(`Provider ${id.toString()} already exists`)
    }
    this.bindings.set(id, Reflect.construct(provider, []))
  }

  public register<T>(provider: Class<T, []>) {
    this.bind(provider.name, provider)
  }

  public resolve<T>(id: string) {
    const instance = this.bindings.get(id)
    if (!instance) {
      throw new Error(`Provider ${id.toString()} not found`)
    }
    return instance as T
  }
}

export const container = new Container()
