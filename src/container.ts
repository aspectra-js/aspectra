import { Metadata } from '#metadata'
import {
  type Provider,
  ProviderScope,
  SingletonProvider,
  TransientProvider,
} from '#provider'
import type { Class } from '#types'
import { type Id, type PrimitiveId, idToString } from '#types/identifier'

type ProviderId = Id

export class Container {
  private readonly providers = new Map<ProviderId, Provider>()

  public register<T>(provider: Class<T, []>): void
  public register<T>(provider: Class<T, []>, containerId: PrimitiveId): void

  public register<T>(provider: Class<T, []>, containerId?: PrimitiveId) {
    const id = containerId || provider
    if (this.providers.has(id)) {
      throw new Error(`Provider ${idToString(id)} already exists`)
    }
    const context = Metadata.fromClass(provider)
    switch (context.providerScope) {
      case ProviderScope.SINGLETON: {
        const instance = new provider()
        this.providers.set(id, new SingletonProvider(instance))
        break
      }
      case ProviderScope.TRANSIENT: {
        this.providers.set(id, new TransientProvider(provider))
        break
      }
      default: {
        throw new Error(`Unknown provider scope: ${context.providerScope}`)
      }
    }
  }

  public resolve<T>(id: ProviderId) {
    if (!this.providers.has(id)) {
      throw new Error(`Provider ${idToString(id)} not found`)
    }
    const provider = this.providers.get(id)
    if (provider instanceof SingletonProvider) {
      return provider.instance as T
    }
    if (provider instanceof TransientProvider) {
      return new provider.classType() as T
    }
    throw new Error(`Unknown provider type ${provider} for ${idToString(id)}`)
  }
}
