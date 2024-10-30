import type { Class } from '#types'
import type { Identifier, PrimitiveIdentifier } from '#types/identifier'

export class Container {
  /**
   * @internal
   * Check if the identifier is a valid container identifier.
   */
  public static isPrimitiveIdentifier(
    identifier: unknown,
  ): identifier is PrimitiveIdentifier {
    return typeof identifier === 'string' || typeof identifier === 'symbol'
  }

  public static identifierToString(identifier: Identifier): string {
    return Container.isPrimitiveIdentifier(identifier)
      ? identifier.toString()
      : identifier.name
  }

  /**
   * @internal
   * The internal storage for bindings.
   * k: [Identifier]
   * v: instance of the class
   */
  private readonly bindings = new Map<Identifier, unknown>()

  public register<T>(provider: Class<T, []>): void
  public register<T>(
    provider: Class<T, []>,
    primitiveIdentifier: PrimitiveIdentifier,
  ): void

  public register<T>(
    provider: Class<T, []>,
    primitiveIdentifier?: PrimitiveIdentifier,
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

  public resolve<T>(identifier: Identifier) {
    if (!this.bindings.has(identifier)) {
      throw new Error(
        `Provider ${Container.identifierToString(identifier)} not found`,
      )
    }
    return this.bindings.get(identifier) as T
  }
}
