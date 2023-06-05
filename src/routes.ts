import { CreateUserController, UsesrAuthController } from './presenters/controllers'
import { Router } from 'express'

const routes = Router()

routes.post('/users', new CreateUserController().handle)
routes.post('/login', new UsesrAuthController().handle)

export { routes }
