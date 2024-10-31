import { Metadata } from '#metadata'
import {
  LazyProvider,
  type Provider,
  ProviderScope,
  SingletonProvider,
  TransientProvider,
} from '#provider'
import type { Class } from '#types'

export class Container {
  private readonly providers = new Map<Class<unknown>, Provider>()

  public register<T>(provider: Class<T, []>) {
    if (this.providers.has(provider)) {
      throw new Error(`Provider ${provider.name} already exists`)
    }
    const context = Metadata.fromClass(provider)
    switch (context.providerScope) {
      case ProviderScope.SINGLETON: {
        const instance = new provider()
        this.providers.set(provider, new SingletonProvider(instance))
        break
      }
      case ProviderScope.TRANSIENT: {
        this.providers.set(provider, new TransientProvider(provider))
        break
      }
      case ProviderScope.LAZY: {
        this.providers.set(provider, new LazyProvider(provider))
        break
      }
      default: {
        throw new Error(`Unknown provider scope: ${context.providerScope}`)
      }
    }
  }

  public resolve<T>(id: Class<unknown>) {
    if (!this.providers.has(id)) {
      throw new Error(`Provider ${id.name} not found`)
    }
    const provider = this.providers.get(id)
    if (provider instanceof SingletonProvider) {
      return provider.instance as T
    }
    if (provider instanceof TransientProvider) {
      return new provider.classType() as T
    }
    if (provider instanceof LazyProvider) {
      if (!provider.initialized) {
        provider.instance = new provider.classType()
        provider.initialized = true
      }
      return provider.instance as T
    }
    throw new Error(`Unknown provider type ${provider} for ${id.name}`)
  }
}
