/* eslint-disable @typescript-eslint/no-floating-promises */

import path from 'path'
import config from '@/infra/database/helpers/ormconfig'
import { ObjectType, Repository, DataSource } from 'typeorm'

export class DatabaseConnection {
  private static instance?: DatabaseConnection
  private connection?: DataSource
  private constructor () {}

  static getInstance (): DatabaseConnection {
    if (DatabaseConnection.instance === undefined) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  async connect (): Promise<void> {
    console.log(config)
    const datasource = new DataSource({
      ...config as any,
      entities: [path.join(__dirname , '../entities/index.{ts,js}')],
      migrations: [path.join(__dirname , '../migrations/*.{ts,js}')],
      migrationsRun: false
    })
    this.connection = await datasource.initialize()
  }

  async disconnect (): Promise<void> {
    if (this.connection !== undefined) {
      await this.connection.destroy()
      this.connection = undefined
    }
  }

  async getRepository<Entity>(entity: ObjectType<Entity>): Promise<Repository<Entity>> {
    this.connection === undefined && process.env.NODE_ENV !== 'test' && await this.connect()

    return this.connection.getRepository(entity)
  }

  async manager () {
    return this.connection.manager
  }
}
