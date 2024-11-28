import { AbstractMetadata } from './abstract-metadata'
import { Context } from './context'
import { Scope } from './lib/scope'

interface Injections {
  origin?: PropertyKey
}

export class Metadata extends AbstractMetadata {
  public scope = Scope.DEFAULT
  public readonly contexts = new Set<Context>([Context.global])
  public readonly injections: Injections = {}
}
