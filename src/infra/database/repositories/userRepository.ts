
import { CreateUsersRepo, UsersAuthRepo } from '@/domain/protocols/repositories'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { CreateUser, UserAuth } from '@/domain/protocols/usecases'
import { UsersEntity } from '../entities'
import { DatabaseRepository } from '../helpers/repository'

export class UserRepository extends DatabaseRepository implements CreateUsersRepo, UsersAuthRepo {
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

  async find (params: UserAuth.Params): Promise<any> {
    const repository = await this.getRepository(UsersEntity)

    const user = await repository.findOneBy({ username: params.username })

    if (!user) {
      return new Error('User does not exists!')
    }

    const passwordMatch = await compare(params.password, user.password)

    if (!passwordMatch) {
      return new Error('User or Password incorrect')
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id
    })

    return { token }
  }
}
