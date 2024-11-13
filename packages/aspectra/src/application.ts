import type { Class } from './internal/types'

/**
 * # @application
 *
 * The `@application` decorator marks the entry point of your aspectra-based
 * application. It instantiates the class it decorates and calls its `start`
 * method automatically.
 *
 * <Callout type='info'>
 *   Lack of `start` method will result in a compile-time error.
 * </Callout>
 *
 * #### Example
 *
 * ```typescript filename='src/index.ts'
 * import { application } from 'aspectra'
 *
 * @application
 * class Application {
 *   public start() {
 *     console.log('Hello, world!')
 *   }
 * }
 * ```
 *
 * This is functionally equivalent to:
 *
 * ```javascript
 * const app = new Application()
 * app.start()
 * ```
 *
 * #### Running the Application
 *
 * ```bash
 * tsx src/index.ts
 * ```
 */
export function application<
  T extends {
    start(): void
  },
>(target: Class<T, []>, _: ClassDecoratorContext<typeof target>): void {
  queueMicrotask(() => {
    Reflect.construct(target, []).start()
  })
}
