import type { Args, Fun } from '#types'

export function bound<A extends Args, R, T>(
  target: Fun<A, R, T>,
  context: ClassMethodDecoratorContext<T, typeof target>,
) {
  context.addInitializer(function () {
    this[context.name as keyof T] = target.bind(this) as T[keyof T]
  })
}
