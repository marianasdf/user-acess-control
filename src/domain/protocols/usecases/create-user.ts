import { CreateUsers } from '@/domain/entities'

export interface CreateUser {

  execute: (params: CreateUser.Params) => Promise<any>
}

export namespace CreateUser {
  export type Params = {
    username: string
    password: string
  }

  export type Result = {
    user: CreateUsers
  }
}
