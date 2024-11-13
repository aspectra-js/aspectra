import { ok } from 'node:assert'
import { describe, test } from 'node:test'
import { contextualize, provider } from '../src'
import { Context } from '../src'

const contextId = import.meta.filename

@contextualize(contextId)
@provider
class Provider {}

describe(import.meta.filename, () => {
  test('should create a provider', () => {
    ok(
      Array.from(Context.of(Provider)).some(context =>
        context.container.resolve(Provider, context),
      ),
    )
  })
})
