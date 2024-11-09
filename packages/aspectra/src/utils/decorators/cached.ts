import { AspectraMap } from '../../collections/map'
import type { TimeString } from '../../lib/ms'
import { ms } from '../../lib/ms'
import type { Fun } from '../../types'
import { type Serializable, serialize } from '../serialize'

interface CacheEntry<T> {
  value: T
  expiration: number
}

/**
 * Caches the method result for a specified duration.
 *
 * @remarks
 * Duration can be specified in milliseconds or using a human-readable string,
 * powered by [`ms`](https://github.com/vercel/ms).
 *
 * @example
 * ```typescript
 * class Calculator {
 *   @cached('5s') public square(num: number): number {
 *     console.log('Calculating...')
 *     return num * num
 *   }
 * }
 *
 * const calculator = new Calculator()
 * console.log(calculator.square(2)) // Calculating... 4
 * console.log(calculator.square(2)) // 4
 * await setTimeout(5000) // wait for cache to expire
 * console.log(calculator.square(2)) // Calculating... 4
 * ```
 */
export function cached<T, U extends Serializable[], R>(
  duration: TimeString | number,
) {
  return (
    target: Fun<U, R, T>,
    context: ClassMethodDecoratorContext<T, typeof target>,
  ) => {
    const cache = new AspectraMap<string, CacheEntry<R>>()
    context.addInitializer(function () {
      this[context.name as keyof T] = ((...args: U) => {
        const now = Date.now()
        const key = serialize(args)
        const entry = cache.get(key)
        if (entry && entry?.expiration > now) {
          return entry.value
        }
        const result = target.call(this, ...args)
        cache.set(key, {
          value: result,
          expiration:
            now + (typeof duration === 'number' ? duration : ms(duration)),
        } satisfies CacheEntry<R>)
        return result
      }) as T[keyof T]
    })
  }
}
