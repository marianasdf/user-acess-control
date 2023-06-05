import { CreateUserController } from './presenters/controllers'
import { Router } from 'express'

const routes = Router()

routes.post('/users', new CreateUserController().handle)

export { routes }
