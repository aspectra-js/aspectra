import { AspectraMap } from '../../collections/map'
import type { Fun } from '../../types'
import { type Serializable, serialize } from '../serialize'

/**
 * Memoizes the method. Usful for optimizing expensive computations.
 *
 * @example
 * ```typescript
 * class Calculator {
 *   @memoized public square(num: number): number {
 *     console.log('Calculating...')
 *     return num * num
 *   }
 * }
 *
 * const calculator = new Calculator()
 * console.log(calculator.square(2)) // Calculating... 4
 * console.log(calculator.square(2)) // 4
 * ```
 */
export function memoized<T, U extends Serializable[], R>(
  target: Fun<U, R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
) {
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
