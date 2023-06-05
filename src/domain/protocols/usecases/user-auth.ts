
export interface UserAuth {

  execute: (params: UserAuth.Params) => Promise<any>
}

export namespace UserAuth {
  export type Params = {
    username: string
    password: string
  }

}
