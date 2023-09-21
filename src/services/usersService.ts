import User from '../models/user.model'
import { EmailAlreadyRegistered, InvalidCredentials, InvalidPasswordLength, InvalidUsernameLength, UserNotFound, UsernameAlreadyRegistered } from './errors/usersService'
import bcrypt from 'bcryptjs'

export class UsersService {
  /**
   * Register a user with email
   * @returns User
   * @throws EmailAlreadyRegistered
   * @throws UsernameAlreadyRegistered
   * @throws InvalidUsernameLength
   * @throws InvalidPasswordLength
   */
  async registerUserWithEmail (username: string, email: string, password: string): Promise<object> {
    /**
     * Business logic validations
     */
    if ((await User.exists({ email })) != null) throw new EmailAlreadyRegistered()
    if ((await User.exists({ username })) != null) throw new UsernameAlreadyRegistered()
    if (username.length < 6) throw new InvalidUsernameLength()
    if (password.length < 8) throw new InvalidPasswordLength()

    const hash = bcrypt.hashSync(password, 12)

    const user = new User({ username, email, password: hash })
    await user.save()
    return user
  }

  /**
   * Authenticate user with email
   * @returns User
   * @throws InvalidCredentials
   */
  async authenticateUserWithEmail (email: string, password: string): Promise<object> {
    const user = await User.findOne({ email })
    if (user == null || !bcrypt.compareSync(password, user.password)) throw new InvalidCredentials()
    return user
  }

  /**
   * Get user info by user id
   * @returns User
   * @throws UserNotFound
   */
  async retrieveUserInfoById (id: string): Promise<object> {
    const user = await User.findById(id)
    if (user == null) throw new UserNotFound()
    return user
  }

  /**
   * Get all users info
   * @returns User[]
   */
  async retrieveAllUsersInfo (): Promise<object[]> {
    const users = await User.find()
    return users
  }
}
