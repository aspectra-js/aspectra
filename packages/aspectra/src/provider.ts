import type { Context } from './context'
import { Strategy } from './lib/strategy'
import { Metadata } from './metadata'
import type { Class } from './types'

export type ProviderClassType = Class<unknown, []>

export abstract class Provider {
  protected readonly metadata: Metadata

  protected constructor(public readonly classType: ProviderClassType) {
    this.metadata = Metadata.fromClass(classType)
  }

  public static createFromClass(classType: ProviderClassType): Provider {
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

  protected createInstance<T>() {
    return Reflect.construct(this.classType, []) as T
  }
}

export class SingletonProvider extends Provider {
  private instance: unknown

  public override provide<T>() {
    if (!this.instance) {
      this.instance = this.createInstance()
    }
    return this.instance as T
  }
}

export class TransientProvider extends Provider {
  public override provide<T>() {
    return this.createInstance<T>()
  }
}

export class IsolatedProvider extends Provider {
  private readonly providers = new WeakMap<Context, unknown>()

  public override provide<T>(context: Context): T {
    if (!this.providers.has(context)) {
      const instance = this.createInstance<T>()
      this.providers.set(context, instance)
    }
    return this.providers.get(context) as T
  }
}
