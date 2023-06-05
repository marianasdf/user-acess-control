import { UserAuth } from '../usecases'

export interface UsersAuthRepo {
  find: (params: UserAuth.Params) => Promise<any>
}
