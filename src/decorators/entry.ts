import type { Class } from '#types'

/**
 * @documentation
 *
 * Automatically invokes a class's static `main` method.
 *
 * @remarks
 * The target class must include a static `main` method.
 *
 * @example
 * ```typescript
 * import { entry } from 'aspectra'
 *
 * @entry
 * class Main {
 *   public static main() {
 *     console.log('Hello, World!')
 *   }
 * }
 * ```
 */
export function entry<T>(
  target: Class<T> & {
    main(): void
  },
  _: ClassDecoratorContext<typeof target>,
) {
  target.main()
}
