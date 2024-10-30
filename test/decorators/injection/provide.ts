import { equal, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { Aspectra, contextualized, provide, provider } from 'aspectra'

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

@contextualized
class Providers {
  public static readonly [Aspectra.context] = context

  @provide(Provider)
  public readonly provider!: Provider

  @provide(Provider)
  public readonly otherProvider!: Provider

  @provide(identifier)
  public readonly identifiedProvider!: IdentifiedProvider
}

describe(import.meta.filename, () => {
  const { provider, otherProvider, identifiedProvider } = new Providers()

  test('should inject providers correctly', () => {
    ok(provider)
  })

  test('should inject named providers correctly', () => {
    ok(identifiedProvider)
  })

  test('injecting the same provider multiple times should return the same instance', () => {
    equal(provider, otherProvider)
  })
})
