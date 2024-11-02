import type { Context, ContextId } from '../context'
import { Strategy } from '../lib/strategy'
import type { Metadata } from '../metadata'
import type { Provider, ProviderClassType } from '../provider'
import type { UnknownArgs, UnknownClass } from '../types'
import { Base } from './base'

export class Contract<A extends UnknownArgs> extends Base<A> {
  public static readonly MULTIPLE_PROVIDER_SCOPE_MODIFIER = new Contract({
    error: 'MultipleProviderScopeModifierError',
    assertion: (
      target: ProviderClassType,
      metadata: Metadata,
      scope: string,
    ) => ({
      success: metadata.strategy === Strategy.SINGLETON,
      message: `Provider ${target.name} is already marked as ${metadata.strategy}, and you attemped mark as ${scope}`,
    }),
  })

  public static readonly DUPLICATE_PROVIDER = new Contract({
    error: 'DuplicateProviderError',
    assertion: (
      providers: WeakMap<ProviderClassType, Provider>,
      classType: ProviderClassType,
      contextId: ContextId,
    ) => ({
      success: !providers.has(classType),
      message: `Provider ${classType.name} already exists in context: ${String(contextId)}`,
    }),
  })

  public static readonly PROVIDER_NOT_FOUND = new Contract({
    error: 'ProviderNotFoundError',
    assertion: (value: unknown, name: PropertyKey, contexts: Set<Context>) => ({
      success: value !== undefined,
      message: `Provider ${String(name)} not found in contexts: ${[...contexts]
        .map(context => context.id)
        .join(', ')}`,
    }),
  })

  public static readonly SEALED_CLASS_EXTENTION = new Contract({
    error: 'SealedClassExtentionError',
    assertion: (newtarget: UnknownClass, target: UnknownClass) => ({
      success: newtarget === target,
      message: `Class ${target.name} is sealed but extended by ${newtarget.name}.`,
    }),
  })

  public static readonly MISSING_CONTEXT = new Contract({
    error: 'MissingContextError',
    assertion: (target: UnknownClass, keys: Set<PropertyKey>) => ({
      success: keys.size > 0,
      message: `Class ${target.name} is not accessible because it is marked as @local but has no associated context - did you forget to @contextualize?`,
    }),
  })
}
