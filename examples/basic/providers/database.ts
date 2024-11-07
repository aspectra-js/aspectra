import { contextualize, provide, provider } from 'aspectra'
import { memoized } from 'aspectra/utils'
import { ContextId } from '../context-id'
import { Config } from './config'
import { Logger } from './logger'

/**
 * Database provider.
 *
 * We want to contextualize with `ContextId.DATABASE` so that we can limit the
 * usage of this provider to only the contexts that have access to it.
 *
 * Also, we want to use config, so we will contextualize with `ContextId.CONFIG`
 * too.
 */
@contextualize(ContextId.DATABASE, ContextId.CONFIG)
@provider
export class Database {
  @provide(Config)
  public readonly config!: Config

  @provide(Logger)
  private readonly logger!: Logger

  public connect() {
    const endpoint = `${this.config.database.ip}:${this.config.database.post}`
    this.logger.info(`Database connected [${endpoint}]`)
  }

  /**
   * Mock query all users.
   *
   * `@memoized` is one of the useful decorators provided by `aspectra/utils`.
   * It caches the result of the method, so it's only called once.
   *
   * For more, read the docs.
   */
  @memoized public queryAll() {
    this.logger.info('Querying all users...')
    return [
      {
        id: 0,
        name: 'John Doe',
      },
      {
        id: 1,
        name: 'Jane Smith',
      },
      {
        id: 2,
        name: 'Richard Roe',
      },
    ] as const
  }
}
