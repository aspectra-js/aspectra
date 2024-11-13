import type { Fun, UnknownArgs } from '../internal/types'

/**
 * # Bound
 *
 * Binds a class method to its instance.
 *
 * ```typescript
 * import { bound } from 'aspectra/utils'
 *
 * class Example {
 *   private readonly name = 'John'
 *
 *   @bound public greet() {
 *     console.log(`Hello from ${this.name}`)
 *   }
 * }
 *
 * const { greet } = new Example()
 * greet()
 * ```
 */
export function bound<A extends UnknownArgs, R, T>(
  target: Fun<A, R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
): void {
  context.addInitializer(function () {
    this[context.name as keyof T] = target.bind(this) as T[keyof T]
  })
}
