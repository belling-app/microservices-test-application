export class InvalidPasswordLength extends Error {
  constructor () {
    super('Password length is invalid.')
  }
}
