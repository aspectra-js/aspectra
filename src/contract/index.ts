import type { Context, ContextId } from '../context'
import { Strategy } from '../lib/strategy'
import type { Metadata } from '../metadata'
import type { Provider, ProviderClassType } from '../provider'
import type { UnknownArgs, UnknownClass } from '../types'
import { Base } from './base'

export class Contract<A extends UnknownArgs> extends Base<A> {
  public static readonly MISSING_CONTEXT = new Contract({
    error: 'MissingContextError',
    assertion: (target: UnknownClass, keys: Set<PropertyKey>) => ({
      success: keys.size > 0,
      message: `Class ${target.name} is not accessible because it is marked as @local but has no associated context - did you forget to @contextualize?`,
    }),
  })
}
