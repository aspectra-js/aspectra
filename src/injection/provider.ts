import { Metadata } from '#injection/metadata'
import type { Class } from '#types'

export enum ProviderScope {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
  LAZY = 'lazy',
  DEFAULT = ProviderScope.SINGLETON,
}

export type ProviderClassType = Class<unknown, []>

export abstract class Provider {
  constructor(public readonly classType: ProviderClassType) {}

  public static createFromClass(providerClass: ProviderClassType): Provider {
    const metadata = Metadata.fromClass(providerClass)
    switch (metadata.providerScope) {
      case ProviderScope.SINGLETON: {
        return new SingletonProvider(providerClass)
      }
      case ProviderScope.TRANSIENT: {
        return new TransientProvider(providerClass)
      }
      case ProviderScope.LAZY: {
        return new LazyProvider(providerClass)
      }
    }
  }

  abstract provide<T>(): T
}

export class SingletonProvider extends Provider {
  private readonly instance: unknown

  public constructor(providerClass: ProviderClassType) {
    super(providerClass)
    this.instance = new this.classType()
  }

  public override provide<T>() {
    return this.instance as T
  }
}

export class TransientProvider extends Provider {
  public override provide<T>() {
    return new this.classType() as T
  }
}

export class LazyProvider extends Provider {
  private instance: unknown

  public override provide<T>() {
    if (!this.instance) {
      this.instance = new this.classType()
    }
    return this.instance as T
  }
}
