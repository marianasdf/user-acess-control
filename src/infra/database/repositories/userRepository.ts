
import { CreateUsersRepo } from '@/domain/protocols/repositories'
import { hash } from 'bcryptjs'
import { CreateUser } from '@/domain/protocols/usecases'
import { UsersEntity } from '../entities'
import { DatabaseRepository } from '../helpers/repository'

export class UserRepository extends DatabaseRepository implements CreateUsersRepo {
  async create (params: CreateUser.Params): Promise<any> {
    const repository = await this.getRepository(UsersEntity)

    const existUser = await repository.findOneBy({ username: params.username })

    if (existUser) {
      return new Error('User already exists')
    }

    const passwordHash = await hash(params.password, 8)

    const user = repository.create({ username: params.username, password: passwordHash })

    await repository.save(user)

    return user
  }
}
