import 'core-js/actual'

export { autobind } from '#decorators/utility/autobind'
export { bound } from '#decorators/utility/bound'
export { Container } from '#container'
export { Context } from '#context'
export { contextualize } from '#decorators/injection/contextualize'
export { main } from '#decorators/utility/main'
export { memoize } from '#decorators/utility/memoize'
export { sealed } from '#decorators/utility/sealed'
export { singleton } from '#decorators/utility/singleton'
export { transient } from '#decorators/injection/transient'
export { provide } from '#decorators/injection/provide'
export { provider } from '#decorators/injection/provider'

// /**
//  * [Symbol.metadata] polyfill
//  */
// declare global {
//   interface SymbolConstructor {
//     readonly metadata: unique symbol
//   }
// }
// // biome-ignore lint/suspicious/noExplicitAny: Polyfill
// ;(Symbol as any).metadata ??= Symbol.for('Symbol.metadata')
