import { ObjectType, Repository } from 'typeorm'
import { DatabaseConnection } from './connection'

export abstract class DatabaseRepository {
  constructor (private readonly connection: DatabaseConnection = DatabaseConnection.getInstance()) {}

  async getRepository<Entity>(entity: ObjectType<Entity>): Promise<Repository<Entity>> {
    return this.connection.getRepository(entity)
  }

  async manager () {
    return this.connection.manager()
  }
}
