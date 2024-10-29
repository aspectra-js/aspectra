import type { Class } from '#types'

export type ContainerIdentifier = string | symbol

export class Container {
  private readonly bindings = new Map<ContainerIdentifier, unknown>()

  public bind<T>(provider: Class<T, []>, identifier: ContainerIdentifier) {
    if (this.bindings.has(identifier)) {
      throw new Error(`Provider ${identifier.toString()} already exists`)
    }
    this.bindings.set(identifier, Reflect.construct(provider, []))
  }

  public resolve<T>(indentifier: ContainerIdentifier) {
    if (!this.bindings.has(indentifier)) {
      throw new Error(`Provider ${indentifier.toString()} not found`)
    }
    return this.bindings.get(indentifier) as T
  }

  public static isContainerIdentifier(
    identifier: unknown,
  ): identifier is ContainerIdentifier {
    return typeof identifier === 'string' || typeof identifier === 'symbol'
  }
}

export const container = new Container()
