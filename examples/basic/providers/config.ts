import { provider } from 'aspectra'
import { contextualize } from 'aspectra'
import { ContextId } from '../context-id'

interface DatabaseConfig {
  ip: string
  post: number
}

interface ConfigDefinition {
  prefix: string
  database: DatabaseConfig
}

/**
 * We want to contextualize with `ContextId.CONFIG` so that we can limit the
 * usage of this provider to only the contexts that have access to it.
 *
 * Providers are by deafult singleton - they are only instantiated once.
 */
@contextualize(ContextId.CONFIG)
@provider
export class Config implements ConfigDefinition {
  public readonly prefix = 'aspectra'
  public readonly database: DatabaseConfig

  public constructor() {
    this.database = {
      ip: 'localhost',
      post: 5432,
    }
  }
}
