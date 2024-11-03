import type { ContextId } from './context'
import type { Context } from './context'

abstract class AspectraError extends Error {
  protected constructor(message: string) {
    super()
    this.name = this.constructor.name
    this.message = message
  }
}

export class MultipleScopeModifierError extends AspectraError {
  public constructor(name: string, strategy: string, scope: string) {
    super(
      `Provider [${name}] is already marked as [${strategy}], and you attemped mark as [${scope}]`,
    )
  }
}

export class DuplicateProviderError extends AspectraError {
  public constructor(name: string, contextId: ContextId) {
    super(
      `Provider [${name}] already exists in context: [${String(contextId)}]`,
    )
  }
}

export class ProviderNotFoundError extends AspectraError {
  public constructor(name: string, contexts: Set<Context>) {
    super(
      `Provider [${name}] not found in contexts: [${[...contexts].map(context => context.id.toString()).join(', ')}]`,
    )
  }
}

export class ContextIsolationError extends AspectraError {
  public constructor(target: string) {
    super(
      `Provider [${target}] is not accessible from any context because it is marked @local, but has no associated context - did you forget to @contextualize?`,
    )
  }
}

export class SealedClassExtentionError extends AspectraError {
  public constructor(target: string, newtarget: string) {
    super(`Class [${target}] is sealed but extended by [${newtarget}].`)
  }
}
