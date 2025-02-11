export { application } from './decorators/application'
export { Context } from './context'
export { contexts } from './decorators/contexts'
export { contextualize } from './decorators/contextualize'
export { isolated } from './decorators/isolated'
export { origin } from './decorators/origin'
export { transient } from './decorators/transient'
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
