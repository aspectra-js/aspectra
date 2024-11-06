import { ok } from 'node:assert'
import { describe, test } from 'node:test'
import { Context, contextualize, provider } from 'aspectra'

const contextId = import.meta.filename

@contextualize(contextId)
@provider
class Provider {}

describe(import.meta.filename, () => {
  test('should create a provider', () => {
    ok(
      Array.from(Context.getRegistered(Provider)).some(context =>
        context.container.resolve(Provider),
      ),
    )
  })
})
