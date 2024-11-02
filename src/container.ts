import type { ContextId } from './context'
import { Contract } from './contract'
import type { Metadata } from './metadata'
import type { Provider, ProviderClassType } from './provider'

export class Container {
  private readonly providers = new WeakMap<ProviderClassType, Provider>()

  public register(provider: Provider) {
    const { classType } = provider
    Contract.DUPLICATE_PROVIDER.check(this.providers, classType, this.contextId)
    this.providers.set(classType, provider)
    return provider
  }

  public resolve<T>(providerClass: ProviderClassType, metadata: Metadata) {
    return this.providers.get(providerClass)?.provide<T>(metadata)
  }

  public constructor(private readonly contextId: ContextId) {}
}
