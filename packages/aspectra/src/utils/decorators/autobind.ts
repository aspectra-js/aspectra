import type { Class, MixinConstructorArgs } from '../../types'

/**
 * Automatically binds all class methods to the instance.
 *
 * @example
 * ```typescript
 * @autobind
 * class Example {
 *   private readonly name = 'John'
 *
 *   public greet() {
 *     console.log(`Hello from ${this.name}`)
 *   }
 *
 *   public farewell() {
 *     console.log(`Goodbye from ${this.name}`)
 *   }
 * }
 *
 * const { greet, farewell } = new Example()
 * greet() // 'Hello from John'
 * farewell() // 'Goodbye from John'
 * ```
 */
export function autobind<T extends Class<object, MixinConstructorArgs>>(
  target: T,
  _: ClassDecoratorContext<T>,
) {
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
