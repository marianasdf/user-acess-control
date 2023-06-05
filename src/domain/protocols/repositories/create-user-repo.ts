import { CreateUser } from '../usecases'

export interface CreateUsersRepo {
  create: (params: CreateUser.Params) => Promise<CreateUser.Result>
}
