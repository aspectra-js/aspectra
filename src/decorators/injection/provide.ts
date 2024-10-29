import {
  Container,
  type ContainerKey,
  container,
} from '#decorators/injection/container'
import type { Class } from '#types'

export function provide<T, P>(module: Class<P> | ContainerKey) {
  return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
    context.addInitializer(function () {
      this[context.name as keyof T] = container.resolve(
        Container.isKey(module) ? module : module.name,
      )
    })
  }
}
