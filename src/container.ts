import type { Class } from '#types'

class Container {
  private bindings = new Map<string, unknown>()

  public bind<T>(provider: Class<T, []>, id: string) {
    if (this.bindings.has(id)) {
      throw new Error(`Provider ${id} already exists`)
    }
    this.bindings.set(id, Reflect.construct(provider, []))
  }

  public resolve<T>(id: string) {
    if (!this.bindings.has(id)) {
      throw new Error(`Provider ${id} not found`)
    }
    return this.bindings.get(id) as T
  }
}

export const container = new Container()
