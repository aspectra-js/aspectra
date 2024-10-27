import { container } from '#container'
import type { Class } from '#types'

export function provider<T>(
  target: Class<T>,
  _: ClassDecoratorContext<typeof target>,
): void
export function provider(name: string): typeof provider

export function provider<T>(arg: string | Class<T>) {
  if (typeof arg === 'string') {
    return (target: Class<T>, _: ClassDecoratorContext<typeof target>) => {
      container.bind(target, arg)
    }
  }
  container.bind(arg, arg.name)
}
