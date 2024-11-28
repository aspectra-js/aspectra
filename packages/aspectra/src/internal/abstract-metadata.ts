import type { Class, UnknownArgs, UnknownClass } from '../types'
import { AspectraWeakMap } from './collection/weak-map'

export abstract class AbstractMetadata {
  private static readonly namespace = Symbol('aspectra.metadata')

  private static initialize(
    metadata: DecoratorMetadataObject,
  ): AspectraWeakMap<UnknownClass, unknown> {
    // biome-ignore lint/suspicious/noAssignInExpressions: handled properly
    return (metadata[this.namespace] ??=
      new AspectraWeakMap()) as AspectraWeakMap<UnknownClass, unknown>
  }

  public static fromContext<T extends AbstractMetadata>(
    this: new () => T,
    context: DecoratorContext,
  ): T {
    return AbstractMetadata.initialize(context.metadata).getOrPut(
      this,
      () => new this(),
    ) as T
  }

  public static fromClass<T extends AbstractMetadata, U>(
    this: new () => T,
    target: Class<U, UnknownArgs>,
  ): T {
    // biome-ignore lint/suspicious/noAssignInExpressions: handled properly
    const metadata = (target[Symbol.metadata] ??= {
      value: {} as DecoratorMetadataObject,
      writable: false,
      configurable: true,
    })
    return AbstractMetadata.initialize(metadata).getOrPut(
      this,
      () => new this(),
    ) as T
  }
}
