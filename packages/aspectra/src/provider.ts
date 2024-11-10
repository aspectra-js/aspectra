import { AspectraWeakMap } from './collections/weak-map'
import type { Context } from './context'
import { Strategy } from './lib/strategy'
import { Metadata } from './metadata'
import type { Class } from './types'

export type ProviderClassType<T = unknown> = Class<T, []>

export abstract class Provider {
  protected readonly metadata: Metadata

  protected constructor(public readonly classType: ProviderClassType) {
    this.metadata = Metadata.fromClass(classType)
  }

  public static fromClassType(classType: ProviderClassType): Provider {
    const metadata = Metadata.fromClass(classType)
    switch (metadata.strategy) {
      case Strategy.SINGLETON: {
        return new SingletonProvider(classType)
      }
      case Strategy.TRANSIENT: {
        return new TransientProvider(classType)
      }
      case Strategy.ISOALTED: {
        return new IsolatedProvider(classType)
      }
    }
  }

  abstract provide<T>(context: Context): T

  protected createInstance<T>(context: Context) {
    const instance = Reflect.construct(this.classType, []) as T
    instance[this.metadata.injectionKeys.origin as keyof T] =
      context as T[keyof T]
    return instance
  }
}

export class SingletonProvider extends Provider {
  private instance: unknown

  public override provide<T>(context: Context) {
    if (!this.instance) {
      this.instance = this.createInstance(context)
    }
    return this.instance as T
  }
}

export class TransientProvider extends Provider {
  public override provide<T>(context: Context) {
    return this.createInstance<T>(context)
  }
}

export class IsolatedProvider extends Provider {
  private readonly providers = new AspectraWeakMap<Context, unknown>()

  public override provide<T>(context: Context): T {
    return this.providers.getOrPut(context, () => {
      return this.createInstance<T>(context)
    }) as T
  }
}
