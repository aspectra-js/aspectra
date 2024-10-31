import type { Provider, ProviderClassType } from '#injection/provider'

export class Container {
  private readonly providers = new WeakMap<ProviderClassType, Provider>()

  public register(provider: Provider) {
    const { classType } = provider
    if (this.providers.has(classType)) {
      throw new Error(`Provider ${classType.name} already exists`)
    }
    this.providers.set(classType, provider)
    return provider
  }

  public resolve<T>(providerClass: ProviderClassType) {
    return this.providers.get(providerClass)?.provide<T>()
  }
}
