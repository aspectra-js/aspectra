import { provider } from 'aspectra'
import { User } from 'test/models/user'

@provider
export class Database {
  private readonly users = ['John', 'Jane', 'Doe'].map((name, index) => {
    return new User(index.toString(), name)
  })

  public getUsers() {
    return this.users
  }
}
