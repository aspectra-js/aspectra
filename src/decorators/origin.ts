import { Metadata } from '../metadata'

/**
 * Injects the context in which the provider was instantiated into the decorated field.
 *
 * This decorator allows access to the origin context directly from within the
 * provider, making it possible to tailor behavior based on the instantiation context.
 *
 * @example
 * ```typescript
 * @provider
 * class Service {
 *   @origin
 *   public originContext!: Context
 *
 *   @postconstruct
 *   public logOrigin() {
 *     console.log(`Instantiated in context: ${this.originContext.id}`)
 *   }
 * }
 * ```
 */
export function origin(target: unknown, context: ClassFieldDecoratorContext) {
  Metadata.fromContext(context).originKey = context.name
}
