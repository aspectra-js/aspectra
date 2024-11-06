import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import {
  type Context,
  contextualize,
  isolated,
  origin,
  provide,
  provider,
} from 'aspectra'

const contexts = ['context-a', 'context-b'] as const

@contextualize(...contexts)
@isolated
@provider
class Provider {
  @origin
  public readonly origin!: Context
}

@contextualize(contexts[0])
class FirstConsumer {
  @provide(Provider)
  public readonly provider!: Provider
}

@contextualize(contexts[1])
class SecondConsumer {
  @provide(Provider)
  public readonly provider!: Provider
}

describe(import.meta.filename, () => {
  test('check origin', () => {
    const classes = [FirstConsumer, SecondConsumer]
    for (let i = 0; i < classes.length; i++) {
      const { provider } = Reflect.construct(classes[i], [])
      equal(provider.origin.id, contexts[i])
    }
  })
})
