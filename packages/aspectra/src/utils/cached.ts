import { AspectraMap } from '../internal/collections/map'
import { type TimeString, ms } from '../internal/lib/ms'
import { type Serializable, serialize } from '../internal/serialize'
import type { Fun } from '../internal/types'

interface CacheEntry<T> {
  value: T
  expiration: number
}

/**
 * # Cached
 *
 * Similar to `memoized`, but with an expiration time.
 *
 * <Callout type='info'>
 *   Duration can be specified in milliseconds or using a human-readable
 *   string, powered by [`ms`](https://github.com/vercel/ms?tab=readme-ov-file#ms).
 * </Callout>
 *
 * ```typescript
 * import { cached } from 'aspectra/utils'
 *
 * class Database {
 *   @cached('2h') public queryAll() {
 *     // sql: SELECT * FROM table
 *   }
 * }
 * ```
 */
export function cached<T, U extends Serializable[], R>(
  duration: TimeString | number,
) {
  return (
    target: Fun<U, R, T>,
    context: ClassMethodDecoratorContext<T, typeof target>,
  ): void => {
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
