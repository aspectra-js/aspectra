import { Provider, type ProviderClassType } from '#injection/provider'

export class Container {
  private readonly providers = new Map<ProviderClassType, Provider>()

  public register(providerClass: ProviderClassType) {
    const provider = Provider.createFromClass(providerClass)
    if (this.providers.has(providerClass)) {
      throw new Error(`Provider ${provider.classType.name} already exists`)
    }
    this.providers.set(providerClass, provider)
  }

  public resolve<T>(providerClass: ProviderClassType) {
    const resolved = this.providers.get(providerClass)?.provide<T>()
    if (!resolved) {
      throw new Error(`Provider ${providerClass.name} not found`)
    }
    return resolved
  }
}
