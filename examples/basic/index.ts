import { contextualize, provide } from 'aspectra'
import { application } from 'aspectra/utils'
import { ContextId } from './context-id'
import { Database } from './providers/database'
import { Logger } from './providers/logger'

/**
 * `@application` defines the main application class.
 *
 * `@contextualize` is used to specify which context we want to associate with.
 * Think of it as a permission system. In this case, we want the permission to
 * use the database.
 *
 * (`Logger` is automatically available because it's in the global context.
 * Read `providers/logger.ts` for more information.)
 */
@application
@contextualize(ContextId.DATABASE)
class Application {
  // We use the `@provide` decorator to inject the `Logger` and `Database`
  @provide(Logger)
  private readonly logger!: Logger

  // notice the `!` for definite assignment
  @provide(Database)
  private readonly database!: Database

  // This method is automatically called by [@application] on load
  public start() {
    this.logger.info('Application started!')
    this.database.connect()
    const users = this.database.queryAll()
    console.log(users)
    /**
     * Output:
     * [aspectra]: Application started!
     * [aspectra]: Database connected [localhost:5432]
     * [aspectra]: Querying all users...
     * [
     *   { id: 0, name: 'John Doe' },
     *   { id: 1, name: 'Jane Smith' },
     *   { id: 2, name: 'Richard Roe' }
     * ]
     */
  }
}
