import type { Class, MixinConstructorArgs } from '#types'

export function autobind<T extends Class<object>>(
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
        if (name === 'constructor' || typeof this[name] !== 'function') {
          continue
        }
        this[name] = this[name].bind(this)
      }
    }
  }
}
