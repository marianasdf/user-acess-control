
import { CreateUsersRepo } from '@/domain/protocols/repositories'

import { CreateUser } from '../protocols/usecases'

export class CreateUserUsecase implements CreateUser {
  constructor (private readonly userRepo: CreateUsersRepo) {

  }

  async execute (params: CreateUser.Params): Promise<any> {
    return await this.userRepo.create(params)
  }
}
