import type { ContextId } from './context'
import { DuplicateProviderError } from './lib/error'
import type { Metadata } from './metadata'
import type { Provider, ProviderClassType } from './provider'

export class Container {
  private readonly providers = new WeakMap<ProviderClassType, Provider>()

  public register(provider: Provider) {
    const { classType } = provider
    if (this.providers.has(classType)) {
      throw new DuplicateProviderError(classType.name, this.contextId)
    }
    this.providers.set(classType, provider)
    return provider
  }

  public resolve<T>(providerClass: ProviderClassType, metadata: Metadata) {
    return this.providers.get(providerClass)?.provide<T>(metadata)
  }

  public constructor(private readonly contextId: ContextId) {}
}
