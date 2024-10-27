import { provide } from 'aspectra'
import { Database } from 'test/models/database'

class Group {
  @provide(Database)
  private readonly database!: Database

  public getPeople() {
    return this.database.getUsers()
  }
}
