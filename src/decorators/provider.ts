import { container } from '#container'
import type { Class } from '#types'

export function provider(
  target: Class<object>,
  _: ClassDecoratorContext<typeof target>,
): void
export function provider(name: string): typeof provider

export function provider<T extends Class<object>>(arg0: string | T) {
  if (typeof arg0 === 'string') {
    return (target: T, _: ClassDecoratorContext<typeof target>) => {
      container.bind(arg0, target)
    }
  }
  container.register(arg0)
}
