import type { Class } from '#types'

export function entry<T>(
  target: Class<T> & {
    main(): void
  },
  _: ClassDecoratorContext<typeof target>,
) {
  target.main()
}
