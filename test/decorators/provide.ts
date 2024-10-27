import { ok } from 'node:assert'
import { describe, test } from 'node:test'
import { provide } from 'aspectra'
import { NamedSampleProvider, SampleProvider } from 'test/models/providers'

class Test {
  @provide(SampleProvider)
  public readonly sampleProvider!: SampleProvider

  @provide(NamedSampleProvider.qualifier)
  public readonly namedSampleProvider!: NamedSampleProvider
}

describe(import.meta.filename, () => {
  test('should inject providers correctly', () => {
    const test = new Test()
    ok(test.sampleProvider.isOk)
  })

  test('should inject named providers correctly', () => {
    const test = new Test()
    ok(test.namedSampleProvider.isOk)
  })
})
