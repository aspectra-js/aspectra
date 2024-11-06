import { Metadata } from '../metadata'

export function origin(target: unknown, context: ClassFieldDecoratorContext) {
  Metadata.fromContext(context).originKey = context.name
}
