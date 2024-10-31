export { autobind } from '#general/decorators/autobind'
export { bound } from '#general/decorators/bound'
export { Context } from '#injection/context'
export { contextualize } from '#injection/decorators/contextualize'
export { main } from '#general/decorators/main'
export { memoized } from '#general/decorators/memoized'
export { sealed } from '#general/decorators/sealed'
export { singleton } from '#general/decorators/singleton'
export { transient } from '#injection/decorators/transient'
export { provide } from '#injection/decorators/provide'
export { provider } from '#injection/decorators/provider'

/**
 * [Symbol.metadata] polyfill
 */
declare global {
  interface SymbolConstructor {
    readonly metadata: unique symbol
  }
}
// biome-ignore lint/suspicious/noExplicitAny: Polyfill
;(Symbol as any).metadata ??= Symbol.for('Symbol.metadata')
