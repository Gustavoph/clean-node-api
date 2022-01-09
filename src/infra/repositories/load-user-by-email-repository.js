const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const env = require('../../main/config/env')
module.exports = class LoadUserByEmailRepository {
  async load (email) {
    const db = await MongoHelper.connect(env.mongoUrl)
    if (!email) throw new MissingParamError('email')
    const user = await db.collection('users').findOne({ email })
    return user
  }
}
