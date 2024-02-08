export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://docker:docker@mongo:27017/?authMechanism=DEFAULT',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '53cr3t',
  salt: process.env.SALT || 12
}
