import { AspectraWeakMap } from './collections/weak-map'
import { Context } from './context'
import { DuplicateProviderError } from './lib/error'
import type { Provider, ProviderClassType } from './provider'

export class Container {
  private readonly providers = new AspectraWeakMap<
    ProviderClassType,
    Provider
  >()

  public register(provider: Provider, context: Context) {
    const { classType } = provider
    if (this.providers.has(classType)) {
      throw new DuplicateProviderError(classType.name, context.id)
    }
    this.providers.set(classType, provider)
    return provider
  }

  public resolve<T>(providerClass: ProviderClassType, context: Context) {
    for (const providers of [
      this.providers,
      Context.global.container.providers,
    ]) {
      const provider = providers.get(providerClass)
      if (provider) {
        return provider.provide<T>(context)
      }
    }
    return
  }
}
