import { provider } from 'aspectra'
import { provide } from 'aspectra'
import { contextualize } from 'aspectra'
import { Context } from 'aspectra'
import { ContextId } from '../context-id'
import { Config } from './config'

/**
 * Logger provider.
 *
 * Context is a little confusing here - we want to make logger available
 * globally, so we use `Context.global`. This is a special context that
 * is always available.
 *
 * We also want to use the `Config` provider, so we use `ContextId.CONFIG`.
 */
@contextualize(Context.global, ContextId.CONFIG)
@provider
export class Logger {
  @provide(Config)
  public readonly config!: Config

  public info(content: string) {
    console.info(`[${this.config.prefix}]: ${content}`)
    // write to a file, send to a service, etc.
  }
}
