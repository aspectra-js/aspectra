import type { Class } from '#types'

export function provide<T, P>(module: Class<P>) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {}
}
