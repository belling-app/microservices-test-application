export class EmailAlreadyRegistered extends Error {
  constructor () {
    super('Email is already registered.')
  }
}
