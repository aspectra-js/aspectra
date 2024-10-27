import { ok, throws } from 'node:assert'
import { describe, test } from 'node:test'
import { provider } from 'aspectra'
import { NamedSampleProvider, SampleProvider } from 'test/models/providers'
import { container } from '#container'

describe(import.meta.filename, () => {
  test('should register to container', () => {
    ok(container.resolve<SampleProvider>(SampleProvider.name).isOk)
  })

  test('should registers to container with name', () => {
    ok(
      container.resolve<NamedSampleProvider>(NamedSampleProvider.qualifier)
        .isOk,
    )
  })

  test('conflicting provider name should throw', () => {
    throws(() => {
      @provider(NamedSampleProvider.qualifier)
      class ConflictingProvider {}
    })
  })
})
