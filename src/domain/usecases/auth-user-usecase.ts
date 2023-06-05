
import { UsersAuthRepo } from '@/domain/protocols/repositories'

import { UserAuth } from '../protocols/usecases'

export class UsersAuthUsecase implements UserAuth {
  constructor (private readonly userRepo: UsersAuthRepo) {

  }

  async execute (params: UserAuth.Params): Promise<any> {
    return await this.userRepo.find(params)
  }
}
