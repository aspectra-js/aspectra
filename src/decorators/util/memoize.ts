import type { Args, Fun } from '#types'
import { type Serializable, serialize } from '#utils/serialize'

/**
 * Memoizes the method. Usful for optimizing expensive computations.
 *
 * @example
 * ```typescript
 * class Calculator {
 *   @memoize
 *   public square(num: number): number {
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
export function memoize<T, U extends Args & Serializable, R>(
  target: Fun<U, R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
) {
  const cache = new Map<string, R>()
  context.addInitializer(function () {
    this[context.name as keyof T] = ((...args: U) => {
      const key = serialize(args)
      if (cache.has(key)) {
        // biome-ignore lint/style/noNonNullAssertion: Checked for existence above
        return cache.get(key)!
      }
      const result = target.call(this, ...args)
      cache.set(key, result)
      return result
    }) as T[keyof T]
  })
}
