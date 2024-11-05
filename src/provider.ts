import type { ContextId } from './context'
import { Strategy } from './lib/strategy'
import { Metadata } from './metadata'
import type { Class } from './types'

export type ProviderClassType = Class<unknown, []>

export abstract class Provider {
  protected constructor(public readonly classType: ProviderClassType) {}

  public static createFromClass(providerClass: ProviderClassType): Provider {
    const metadata = Metadata.fromClass(providerClass)
    switch (metadata.strategy) {
      case Strategy.SINGLETON: {
        return new SingletonProvider(providerClass)
      }
      case Strategy.TRANSIENT: {
        return new TransientProvider(providerClass)
      }
      case Strategy.ISOALTED: {
        return new IsolatedProvider(providerClass)
      }
    }
  }

  abstract provide<T>(metadata: Metadata): T
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

export class IsolatedProvider extends Provider {
  private readonly providers = new Map<ContextId, unknown>()

  public override provide<T>(metadata: Metadata) {
    let provider: unknown
    for (const contextId of metadata.contextIds) {
      provider = this.providers.get(contextId) || new this.classType()
      this.providers.set(contextId, provider)
    }
    return provider as T
  }
}
