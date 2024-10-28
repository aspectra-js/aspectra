import type { Args, Fun } from '#types'

/**
 * @documentation
 *
 * Binds a class method to its instance.
 *
 * @example
 * ```typescript
 * class Example {
 *   private readonly name = 'John'
 *
 *   @bound public greet() {
 *     console.log(`Hello from ${this.name}`)
 *   }
 * }
 *
 * const { greet } = new Example()
 * greet() // "Hello from John"
 * ```
 */
export function bound<A extends Args, R, T>(
  target: Fun<A, R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
) {
  context.addInitializer(function () {
    this[context.name as keyof T] = target.bind(this) as T[keyof T]
  })
}
