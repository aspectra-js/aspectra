import type { Context } from './context'
import { DuplicateProviderError } from './lib/error'
import type { Provider, ProviderClassType } from './provider'

export class Container {
  private readonly providers = new WeakMap<ProviderClassType, Provider>()

  public constructor(private readonly context: Context) {}

  public register(provider: Provider) {
    const { classType } = provider
    if (this.providers.has(classType)) {
      throw new DuplicateProviderError(classType.name, this.context.id)
    }
    this.providers.set(classType, provider)
    return provider
  }

  public resolve<T>(providerClass: ProviderClassType) {
    return this.providers.get(providerClass)?.provide<T>(this.context)
  }
}
