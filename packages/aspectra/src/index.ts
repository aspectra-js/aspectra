export { application } from './application'
export { Context } from './internal/context'
export { contexts } from './contexts'
export { contextualize } from './contextualize'
export { isolated } from './isolated'
export { origin } from './origin'
export { transient } from './transient'
export { provide } from './provide'
export { provider } from './provider'
export * from './types'

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
