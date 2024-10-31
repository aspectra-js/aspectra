import type { ContextId } from '#injection/context'
import type { Provider, ProviderClassType } from '#injection/provider'
import { Contract } from '#internal/contract'

export class Container {
  private readonly providers = new WeakMap<ProviderClassType, Provider>()

  public register(provider: Provider) {
    const { classType } = provider
    Contract.DUPLICATE_PROVIDER.enforce(
      this.providers,
      classType,
      this.contextId,
    )
    this.providers.set(classType, provider)
    return provider
  }

  public resolve<T>(providerClass: ProviderClassType) {
    return this.providers.get(providerClass)?.provide<T>()
  }

  public constructor(private readonly contextId: ContextId) {}
}
