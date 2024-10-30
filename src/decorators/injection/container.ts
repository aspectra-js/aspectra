import type { Class } from '#types'

export type PrimitiveContainerIdentifier = string | symbol

export type ContainerIdentifier<T = unknown> =
  | Class<T, []>
  | PrimitiveContainerIdentifier

export class Container {
  /**
   * @internal
   * Check if the identifier is a valid container identifier.
   */
  public static isPrimitiveIdentifier(
    identifier: unknown,
  ): identifier is PrimitiveContainerIdentifier {
    return typeof identifier === 'string' || typeof identifier === 'symbol'
  }

  public static identifierToString(identifier: ContainerIdentifier): string {
    return Container.isPrimitiveIdentifier(identifier)
      ? identifier.toString()
      : identifier.name
  }

  /**
   * @internal
   * The internal storage for bindings.
   * k: [ContainerIdentifier] or class
   * v: instance of the class
   */
  private readonly bindings = new Map<ContainerIdentifier, unknown>()

  public register<T>(provider: Class<T, []>): void
  public register<T>(
    provider: Class<T, []>,
    primitiveIdentifier: PrimitiveContainerIdentifier,
  ): void

  public register<T>(
    provider: Class<T, []>,
    primitiveIdentifier?: PrimitiveContainerIdentifier,
  ) {
    const containerIdentifier = primitiveIdentifier || provider
    if (this.bindings.has(containerIdentifier)) {
      throw new Error(
        `Provider ${Container.identifierToString(
          containerIdentifier,
        )} already exists`,
      )
    }
    this.bindings.set(containerIdentifier, Reflect.construct(provider, []))
  }

  public resolve<T>(identifier: ContainerIdentifier) {
    if (!this.bindings.has(identifier)) {
      throw new Error(
        `Provider ${Container.identifierToString(identifier)} not found`,
      )
    }
    return this.bindings.get(identifier) as T
  }
}
