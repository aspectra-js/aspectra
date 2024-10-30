// import {
//   Container,
//   type PrimitiveContainerIdentifier,
//   container,
// } from '#container'
// import type { Class } from '#types'
//
// export function provide<T, P>(
//   provider: Class<P>,
// ): (_: unknown, context: ClassFieldDecoratorContext<T, P>) => void
// export function provide<T, P>(
//   identifier: PrimitiveContainerIdentifier,
// ): (_: unknown, context: ClassFieldDecoratorContext<T, P>) => void
//
// /**
//  * Inject a [`@provider`](#provider) into a class field.
//  *
//  * @remarks
//  * If an `identifier` is provided (`string` or `symbol`), this will be used to
//  * resolve the dependency. Otherwise, name of the class will be used as an
//  * identifier.
//  *
//  * If a provider is injected multiple times, new instance will **not** be created -
//  * the same instance will be returned.
//  *
//  * @example
//  * ```typescript
//  * class Providers {
//  *   @provide(SampleProvider)
//  *   // notice the `!` for definite assignment
//  *   private readonly provider!: SampleProvider;
//  *
//  *   // with a custom name
//  *   @provide('custom_name')
//  *   private readonly namedProvider!: NamedProvider;
//  *
//  *   // this will be a same instance as the `provider` above
//  *   @provide(SampleProvider)
//  *   private readonly second_provider!: SampleProvider;
//  * }
//  * ```
//  */
// export function provide<T, P>(arg: Class<P> | PrimitiveContainerIdentifier) {
//   return (_: unknown, context: ClassFieldDecoratorContext<T, P>) => {
//     context.addInitializer(function () {
//       this[context.name as keyof T] = container.resolve(
//         Container.isPrimitiveIdentifier(arg) ? arg : arg.name,
//       ) as T[keyof T]
//     })
//   }
// }
