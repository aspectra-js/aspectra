import type { Class } from '#types'
import { type Id, type PrimitiveId, idToString } from '#types/identifier'

type ContainerId = Id

export class Container {
  /**
   * @internal
   * The internal storage for bindings.
   * k: id
   * v: instance of the class
   */
  private readonly bindings = new Map<ContainerId, unknown>()

  public register<T>(provider: Class<T, []>): void
  public register<T>(provider: Class<T, []>, containerId: PrimitiveId): void

  public register<T>(provider: Class<T, []>, containerId?: PrimitiveId) {
    const id = containerId || provider
    if (this.bindings.has(id)) {
      throw new Error(`Provider ${idToString(id)} already exists`)
    }
    this.bindings.set(id, Reflect.construct(provider, []))
  }

  public resolve<T>(id: ContainerId) {
    if (!this.bindings.has(id)) {
      throw new Error(`Provider ${idToString(id)} not found`)
    }
    return this.bindings.get(id) as T
  }
}
