import { provider } from 'aspectra'

@provider
export class SampleProvider {
  public readonly isOk = true
}

const name = 'named_sample_provider'

@provider(name)
export class NamedSampleProvider {
  public static readonly qualifier = name

  public readonly isOk = true
}
