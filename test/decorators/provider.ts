import { ok, throws } from 'node:assert'
import { describe, test } from 'node:test'
import { provider } from 'aspectra'
import { container } from '#container'

@provider
class SampleProvider {
  public readonly ok = true
}

const name = 'named_sample_provider'

@provider(name)
class NamedSampleProvider {
  public readonly ok = true
}

describe(import.meta.filename, () => {
  test(`@${provider.name} registers to container`, () => {
    ok(container.resolve<SampleProvider>(SampleProvider.name).ok)
  })

  test(`@${provider.name} registers to container with name`, () => {
    ok(container.resolve<NamedSampleProvider>(name).ok)
  })

  test('conflicting provider name should throw', () => {
    throws(() => {
      @provider(name)
      class ConflictingProvider {}
    })
  })
})
