const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const env = require('../../main/config/env')
module.exports = class UpdateAccessTokenRepository {
  async update (userId, accessToken) {
    if (!userId) { throw new MissingParamError('userId') }

    if (!accessToken) { throw new MissingParamError('accessToken') }

    const db = await MongoHelper.connect(env.mongoUrl)
    await db.collection('users').updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}
