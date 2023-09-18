import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { UsersService } from '../services/usersService'
import asyncHandler from 'express-async-handler'

const router = Router()
const usersService = new UsersService()
const usersController = new UsersController(usersService)

router.get('/', asyncHandler(usersController.getAllUsers))

router.get('/:id', asyncHandler(usersController.getUserById))

router.post('/email-login', asyncHandler(usersController.authenticateUserWithEmail))

router.post('/', asyncHandler(usersController.registerUserWithEmail))

export default router
