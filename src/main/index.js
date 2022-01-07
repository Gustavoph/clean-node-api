const express = require('express')
const app = express()

const setupApp = require('./config/setup')
setupApp(app)
app.disable('x-powered-by')
app.get('/mango', (req, res) => {
  res.send('mango')
})

app.listen(5858, () => console.log('Server running'))
