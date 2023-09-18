/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextFunction, type Request, type Response } from 'express'
import { type UsersService } from '../services/usersService'

// TODO data validation from request!
export class UsersController {
  private readonly usersService: UsersService

  constructor (usersService: UsersService) {
    this.usersService = usersService

    this.registerUserWithEmail = this.registerUserWithEmail.bind(this)
    this.authenticateUserWithEmail = this.authenticateUserWithEmail.bind(this)
    this.getUserById = this.getUserById.bind(this)
    this.getAllUsers = this.getAllUsers.bind(this)
  }

  async registerUserWithEmail (req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, username, password } = req.body

    if (email === undefined || username === undefined || password === undefined) return res.status(400).json({ error: 'missing fields' })

    try {
      const user = await this.usersService.registerUserWithEmail(username, email, password)
      return res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  async authenticateUserWithEmail (req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body

    if (email === undefined || password === undefined) return res.status(400).json({ error: 'missing fields' })

    try {
      const user = await this.usersService.authenticateUserWithEmail(email, password)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async getUserById (req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params

    try {
      const user = await this.usersService.retrieveUserInfoById(id)
      return res.json(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async getAllUsers (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await this.usersService.retrieveAllUsersInfo()
      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
}
