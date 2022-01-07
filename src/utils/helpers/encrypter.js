const bcrypt = require('bcrypt')
const { MissingParamError } = require('../errors')

class Encrypter {
  async compare (password, hashedPassword) {
    if (!password) {
      throw new MissingParamError('password')
    }
    if (!hashedPassword) {
      throw new MissingParamError('hashedPassword')
    }
    return await bcrypt.compare(password, hashedPassword)
  }
}

module.exports = { Encrypter }
