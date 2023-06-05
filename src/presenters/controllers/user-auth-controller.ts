import { Request, Response } from 'express'
import { UsersAuthUsecase } from '../../domain/usecases'
import { UserAuth } from '../../domain/protocols/usecases'
import { UserRepository } from '../../infra/database/repositories/userRepository'

export class UsesrAuthController {
  async handle (request: Request, response: Response) {
    const params = request.body as UserAuth.Params

    const user = new UsersAuthUsecase(new UserRepository())
    const result = await user.execute(params)

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
