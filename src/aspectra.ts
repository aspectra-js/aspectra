/**
 * @internal
 * Well-known symbols and constants.
 *
 * All symbols and constants should be defined here to avoid circular dependencies.
 */
export class Aspectra {
  public static readonly METADATA_NAMESPACE = Symbol('metadata')
  public static readonly GLOBAL_CONTEXT_ID = Symbol('context')
}
