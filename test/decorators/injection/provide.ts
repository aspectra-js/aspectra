import { equal, ok } from 'node:assert'
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
  const { sampleProvider, namedSampleProvider, otherSampleProvider } =
    new Providers()

  test('should inject providers correctly', () => {
    ok(sampleProvider)
  })

  test('should inject named providers correctly', () => {
    ok(namedSampleProvider)
  })

  test('injecting the same provider multiple times should return the same instance', () => {
    equal(sampleProvider, otherSampleProvider)
  })
})
