import type { Class, MixinConstructorArgs } from '../../types'

/**
 * # Autobind
 *
 * Automatically binds all class methods to the instance.
 *
 * ```typescript
 * import { autobind } from 'aspectra/utils'
 *
 * @autobind
 * class Greeting {
 *   private readonly name = 'John'
 *
 *   public hello() {
 *     console.log(`Hello from ${this.name}`)
 *   }
 *
 *   public farewell() {
 *     console.log(`Goodbye from ${this.name}`)
 *   }
 * }
 *
 * const { hello, farewell } = new Greeting()
 * hello()
 * farewell()
 * ```
 */
export function autobind<T extends Class<object, MixinConstructorArgs>>(
  target: T,
  _: ClassDecoratorContext<T>,
): T {
  return class extends target {
    constructor(...args: MixinConstructorArgs) {
      super(...args)
      const names = Object.getOwnPropertyNames(target.prototype) as Array<
        keyof this
      >
      for (const name of names) {
        if (typeof this[name] === 'function' && name !== 'constructor') {
          this[name] = this[name].bind(this)
        }
      }
    }
  }
}
