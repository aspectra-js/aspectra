import type { Class } from '../../types'

/**
 * Entry point of the application. Will instantiate the class and calls the
 * `start` method.
 *
 * @example
 * ```typescript
 * @application
 * class Application {
 *   public start() {
 *     // ...
 *   }
 * }
 * ```
 */
export function application<
  T extends {
    start(): void
  },
>(target: Class<T, []>, context: ClassDecoratorContext<typeof target>) {
  queueMicrotask(() => Reflect.construct(target, []).start())
}
