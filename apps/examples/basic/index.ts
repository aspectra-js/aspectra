import { application, provide, provider } from 'aspectra'
import { cached } from 'aspectra/utils'

@provider
class DatabaseProvider {
  @cached('1h') public getAll() {
    return ['john', 'jane', 'joe']
  }
}

@application
class Application {
  @provide(DatabaseProvider)
  private readonly database!: DatabaseProvider

  public start() {
    console.log(this.database.getAll())
  }
}
