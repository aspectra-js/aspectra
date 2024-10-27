import { deepStrictEqual, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { provide } from 'aspectra'
import { NamedSampleProvider, SampleProvider } from 'test/models/providers'

class Test {
  @provide(SampleProvider)
  public readonly sampleProvider!: SampleProvider

  @provide(SampleProvider)
  public readonly otherSampleProvider!: SampleProvider

  @provide(NamedSampleProvider.qualifier)
  public readonly namedSampleProvider!: NamedSampleProvider
}

describe(import.meta.filename, () => {
  test('should inject providers correctly', () => {
    const { isOk } = new Test().sampleProvider
    ok(isOk)
  })

  test('should inject named providers correctly', () => {
    const { isOk } = new Test().namedSampleProvider
    ok(isOk)
  })

  test('injecting the same provider multiple times should return the same instance', () => {
    const { sampleProvider, otherSampleProvider } = new Test()
    deepStrictEqual(sampleProvider, otherSampleProvider)
  })
})
