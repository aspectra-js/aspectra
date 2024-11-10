import type { Fun, UnknownArgs } from '../../types'

/**
 * Automatically invokes a decorated method.
 *
 * @example
 * ```typescript
 * import { main } from 'aspectra'
 *
 * class Main {
 *   @main public static start() {
 *     console.log('Hello, World!')
 *   }
 * }
 * ```
 **/
export function main<A extends UnknownArgs, R, T>(
  target: Fun<A, R, T>,
  context: ClassMethodDecoratorContext<T, typeof target> & {
    static: true
  },
): void {
  context.addInitializer(function () {
    target.apply(this)
  })
}
