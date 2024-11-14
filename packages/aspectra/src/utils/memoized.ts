import { AspectraMap } from '../internal/collection/map'
import { type Serializable, serialize } from '../internal/serialize'
import type { Fun } from '../types'

/**
 * # Memoized
 *
 * Memoizes the method. Usful for optimizing expensive computations.
 *
 * ```typescript
 * import { memoized } from 'aspectra/utils'
 *
 * class Calculator {
 *   @memoized public square(num: number): number {
 *     console.log('Calculating...')
 *     return num * num
 *   }
 * }
 *
 * const calculator = new Calculator()
 * console.log(calculator.square(2))
 * console.log(calculator.square(2))
 * ```
 */
export function memoized<T, U extends Serializable[], R>(
  target: Fun<U, R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
): void {
  const cache = new AspectraMap<string, R>()
  context.addInitializer(function () {
    this[context.name as keyof T] = ((...args: U) => {
      const key = serialize(args)
      return cache.getOrPut(key, () => {
        return target.call(this, ...args)
      })
    }) as T[keyof T]
  })
}
