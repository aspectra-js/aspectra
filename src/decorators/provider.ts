import { container } from '#container'
import type { Class } from '#types'

export function provider<T>(
  target: Class<T>,
  _: ClassDecoratorContext<typeof target>,
): void
export function provider(name: string): typeof provider

export function provider<T>(arg0: string | Class<T>) {
  if (typeof arg0 === 'string') {
    return (target: Class<T>, _: ClassDecoratorContext<typeof target>) => {
      container.bind(arg0, target)
    }
  }
  container.register(arg0)
}
