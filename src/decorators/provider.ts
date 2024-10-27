import { type ContainerKey, container } from '#container'
import type { Class } from '#types'

export function provider<T>(
  target: Class<T>,
  _: ClassDecoratorContext<typeof target>,
): void
export function provider(name: ContainerKey): typeof provider

export function provider<T>(arg: ContainerKey | Class<T>) {
  if (typeof arg === 'string' || typeof arg === 'symbol') {
    return (target: Class<T>, _: ClassDecoratorContext<typeof target>) => {
      container.bind(target, arg)
    }
  }
  container.bind(arg, arg.name)
}
