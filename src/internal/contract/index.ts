import type { Context, ContextId } from '#injection/context'
import type { Metadata } from '#injection/metadata'
import {
  type Provider,
  type ProviderClassType,
  ProviderScope,
} from '#injection/provider'
import { Base } from '#internal/contract/base'
import type { UnknownArgs, UnknownClass } from '#types'

export class Contract<A extends UnknownArgs> extends Base<A> {
  public static readonly MULTIPLE_PROVIDER_SCOPE_MODIFIER = new Contract({
    title: 'MultipleProviderScopeModifierError',
    assertion: (
      target: ProviderClassType,
      metadata: Metadata,
      scope: string,
    ) => ({
      success: metadata.providerScope === ProviderScope.DEFAULT,
      message: `Provider ${target.name} is already marked as ${metadata.providerScope}, and you attemped mark as ${scope}`,
    }),
  })

  public static readonly DUPLICATE_PROVIDER = new Contract({
    title: 'DuplicateProviderError',
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
    title: 'ProviderNotFoundError',
    assertion: (value: unknown, name: PropertyKey, contexts: Set<Context>) => ({
      success: value !== undefined,
      message: `Provider ${String(name)} not found in contexts: ${[...contexts]
        .map(context => context.id)
        .join(', ')}`,
    }),
  })

  public static readonly SEALED_CLASS_EXTENTION = new Contract({
    title: 'SealedClassExtentionError',
    assertion: (newtarget: UnknownClass, target: UnknownClass) => ({
      success: newtarget === target,
      message: `Class ${target.name} is sealed but extended by ${newtarget.name}.`,
    }),
  })

  public static readonly MISSING_CONTEXT = new Contract({
    title: 'MissingContextError',
    assertion: (target: UnknownClass, keys: Set<PropertyKey>) => ({
      success: keys.size > 0,
      message: `Class ${target.name} is not accessible because it is marked as @local but has no associated context - did you forget to @contextualize?`,
    }),
  })
}
