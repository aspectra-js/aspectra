import { provider } from 'aspectra'

@provider
export class SampleProvider {
  public static instance = 0

  constructor() {
    SampleProvider.instance++
  }

  public readonly isOk = true
}

const qualifier = 'named_sample_provider_qualifier'

@provider(qualifier)
export class NamedSampleProvider {
  public static readonly qualifier = qualifier

  public readonly isOk = true
}
