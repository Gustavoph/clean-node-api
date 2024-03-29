export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal server error')
    this.name = 'ServerErrorError'
    this.stack = stack
  }
}
