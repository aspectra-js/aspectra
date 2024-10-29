import { ok, throws } from 'node:assert'
import { describe, test } from 'node:test'
import { container, provider } from 'aspectra'
import {
  NamedSampleProvider,
  SampleProvider,
  SymbolNamedSampleProvider,
} from 'test/models/providers'

describe(import.meta.filename, () => {
  test('should register to container', () => {
    ok(container.resolve<SampleProvider>(SampleProvider.name))
  })

  test('should registers to container with name', () => {
    ok(container.resolve<NamedSampleProvider>(NamedSampleProvider.qualifier))
  })

  test('should registers to container with symbol', () => {
    ok(
      container.resolve<SymbolNamedSampleProvider>(
        SymbolNamedSampleProvider.symbolQualifier,
      ),
    )
  })

  test('conflicting provider name should throw', () => {
    throws(() => {
      @provider(NamedSampleProvider.qualifier)
      class ConflictingProvider {}
    })
  })
})
