export class UsernameAlreadyRegistered extends Error {
  constructor () {
    super('Username is already registered.')
  }
}
