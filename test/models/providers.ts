import { provider } from 'aspectra'

@provider
export class SampleProvider {}

const qualifier = 'named_sample_provider_qualifier'

@provider(qualifier)
export class NamedSampleProvider {
  public static readonly qualifier = qualifier
}

const symbolQualifier = Symbol.for(qualifier)

@provider(symbolQualifier)
export class SymbolNamedSampleProvider {
  public static readonly symbolQualifier = symbolQualifier
}
