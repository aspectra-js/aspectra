import { ok } from 'node:assert'
import { describe, test } from 'node:test'
import { Aspectra, Context, contextualized, provider } from 'aspectra'

const context = import.meta.filename

@contextualized
@provider
class Provider {
  public static readonly [Aspectra.context] = context
}

const identifier = 'custom_name'

@contextualized
@provider(identifier)
class IdentifiedProvider {
  public static readonly [Aspectra.context] = context
}

describe(import.meta.filename, () => {
  test('should create a provider', () => {
    const provider = Context.getOrRegister(Provider).container.resolve(Provider)
    ok(provider instanceof Provider)
  })

  test('should create a provider with identifier', () => {
    const provider =
      Context.getOrRegister(IdentifiedProvider).container.resolve(identifier)
    ok(provider instanceof IdentifiedProvider)
  })
})
