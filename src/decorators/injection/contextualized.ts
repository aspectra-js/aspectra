import type { Contextualized } from '#decorators/injection/context'
import type { Class } from '#types'

export function contextualized<T>(
  target: Class<T> & Contextualized,
  _: ClassDecoratorContext<typeof target>,
) {}
