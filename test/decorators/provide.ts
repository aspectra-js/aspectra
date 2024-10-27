import { deepStrictEqual, equal, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { provide } from 'aspectra'
import { NamedSampleProvider, SampleProvider } from 'test/models/providers'

class Providers {
  @provide(SampleProvider)
  public readonly sampleProvider!: SampleProvider

  @provide(SampleProvider)
  public readonly otherSampleProvider!: SampleProvider

  @provide(NamedSampleProvider.qualifier)
  public readonly namedSampleProvider!: NamedSampleProvider
}

describe(import.meta.filename, () => {
  test('should inject providers correctly', () => {
    ok(new Providers().sampleProvider.isOk)
  })

  test('should inject named providers correctly', () => {
    ok(new Providers().namedSampleProvider.isOk)
  })

  test('injecting the same provider multiple times should return the same instance', () => {
    const { sampleProvider, otherSampleProvider } = new Providers()
    equal(SampleProvider.instance, 1)
    deepStrictEqual(sampleProvider, otherSampleProvider)
  })
})
