import { Aspectra } from '#aspectra'
import { Context, type Contextualized } from '#context'
import type { Class } from '#types'

export function contextualized<T>(
  target: Class<T> & Contextualized,
  _: ClassDecoratorContext<typeof target>,
) {
  Context.register(target[Aspectra.context])
}
