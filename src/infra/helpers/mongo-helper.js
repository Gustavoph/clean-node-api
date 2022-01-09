const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.dbName = dbName

    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.db = this.client.db(dbName)
    return this.db
  },

  async disconnect () {
    this.client.close()
  },

  async getCollection (name) {
    return this.db.collection(name)
  }
}
