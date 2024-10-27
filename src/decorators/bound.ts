import type { Fun } from '#types'

export function bound<T, R>(
  target: Fun<[], R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
) {
  context.addInitializer(function () {
    this[context.name as keyof T] = target.bind(this) as T[keyof T]
  })
}
