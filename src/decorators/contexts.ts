import { Context } from '../context'
import type { UnknownClass } from '../types'

/**
 * Retrieve current contexts and injects them.
 *
 * @example
 * ```typescript
 * class Global {
 *   @contexts
 *   public readonly contexts!: ReadonlySet<Context> // Global context
 * }
 *
 * @contextualize('a', 'b')
 * class Contextualized {
 *   @contexts
 *   public readonly contexts!: ReadonlySet<Context> // Context with ids 'a' and 'b'
 * }
 * ```
 */
export function contexts<T extends object>(
  _: unknown,
  context: ClassFieldDecoratorContext<T, ReadonlySet<Context>>,
) {
  context.addInitializer(function () {
    this[context.name as keyof T] = Context.getRegistered(
      this.constructor as UnknownClass,
    ) as T[keyof T]
  })
}
