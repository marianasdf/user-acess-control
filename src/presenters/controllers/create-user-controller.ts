import { Request, Response } from 'express'
import { CreateUserUsecase } from '../../domain/usecases'
import { CreateUser } from '../../domain/protocols/usecases'
import { UserRepository } from '../../infra/database/repositories/userRepository'

export class CreateUserController {
  async handle (request: Request, response: Response) {
    const params = request.body as CreateUser.Params

    const createUser = new CreateUserUsecase(new UserRepository())
    const result = await createUser.execute(params)

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
