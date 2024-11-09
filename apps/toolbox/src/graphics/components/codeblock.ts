import { application, provide, provider } from 'aspectra'
import { memoized } from 'aspectra/utils'

@provider
class DatabaseProvider {
  @memoized public getAll() {
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
