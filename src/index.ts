export { Context } from './context'
export { contextualize } from './decorators/contextualize'
export { isolated } from './decorators/isolated'
export { transient } from './decorators/transient'
export { lazy } from './decorators/lazy'
export { local } from './decorators/local'
export { provide } from './decorators/provide'
export { provider } from './decorators/provider'

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
