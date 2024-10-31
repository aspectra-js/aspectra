declare global {
  interface SymbolConstructor {
    readonly metadata: unique symbol
  }
}
// biome-ignore lint/suspicious/noExplicitAny: Polyfill
;(Symbol as any).metadata ??= Symbol.for('Symbol.metadata')
