import type { Context } from '../context'
import { Metadata } from '../metadata'

export function origin<T>(
  _: unknown,
  context: ClassFieldDecoratorContext<T, Context>,
): void {
  const metadata = Metadata.fromContext(context)
  metadata.injectionKeys.origin = context.name
}
