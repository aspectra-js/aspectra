import { application, contextualize, origin, provide, provider } from 'aspectra'
import { type Context, isolated } from 'aspectra'

enum ContextId {
  DATABASE = 'database',
  APPLICATION = 'application',
}

@isolated
@provider
class LoggerProvider {
  @origin
  private readonly origin!: Context

  public log(message: string) {
    console.log(`[${this.origin.id.toString()}] ${message}`)
  }
}

@contextualize(ContextId.DATABASE)
@provider
class DatabaseProvider {
  @provide(LoggerProvider)
  private readonly loggerProvider!: LoggerProvider

  public connect() {
    this.loggerProvider.log('Connected to database')
  }
}

@contextualize(ContextId.APPLICATION, ContextId.DATABASE)
@application
class Application {
  @provide(LoggerProvider)
  private readonly loggerProvider!: LoggerProvider

  @provide(DatabaseProvider)
  private readonly databaseProvider!: DatabaseProvider

  public start() {
    this.loggerProvider.log('Starting application')
    this.databaseProvider.connect()
  }
}
