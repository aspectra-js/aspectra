import type { Fun } from '../../types'

/**
 * Decorated method is automatically invoked after the class is constructed.
 *
 * @example
 * ```typescript
 * class Test {
 *   @postconstruct public init() {
 *     console.log('PostConstruct')
 *   }
 * }
 * ```
 */
export function postconstruct<T, R>(
  target: Fun<[], R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
): void {
  context.addInitializer(function () {
    target.call(this)
  })
}
