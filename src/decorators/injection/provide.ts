import { container } from '#decorators/injection/container'
import type { Class } from '#types'

export function provide<T, P>(module: Class<P> | string) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    context.addInitializer(function () {
      this[context.name as keyof T] = container.resolve(
        typeof module === 'string' ? module : module.name,
      )
    })
  }
}
