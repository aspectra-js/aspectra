import type { ContextId } from '../context'
import type { Context } from '../context'

abstract class CustomError extends Error {
  protected constructor(message: string) {
    super()
    this.name = this.constructor.name
    this.message = message
  }
}

export class MultipleScopeModifierError extends CustomError {
  public constructor(name: string, strategy: string, scope: string) {
    super(
      `Provider [${name}] is already marked as [${strategy}], and you attemped mark as [${scope}]`,
    )
  }
}

export class DuplicateProviderError extends CustomError {
  public constructor(name: string, contextId: ContextId) {
    super(
      `Provider [${name}] already exists in context: [${String(contextId)}]`,
    )
  }
}

export class ProviderNotFoundError extends CustomError {
  public constructor(name: string, contexts: Set<Context>) {
    super(
      `Provider [${name}] not found in contexts: [${Array.from(contexts)
        .map(context => context.id.toString())
        .join(', ')}]`,
    )
  }
}

export class DuplicateContextError extends CustomError {
  public constructor(id: ContextId) {
    super(`Context with id [${id.toString}] already exists`)
  }
}

export class SealedClassExtentionError extends CustomError {
  public constructor(target: string, newtarget: string) {
    super(`Class [${target}] is sealed but extended by [${newtarget}].`)
  }
}
