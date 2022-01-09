const cors = require('../middleware/cors')
const jsonParse = require('../middleware/json-parse')
const contentType = require('../middleware/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParse)
  app.use(contentType)
}
