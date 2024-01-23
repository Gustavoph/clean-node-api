import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'

export const app = express()
setupMiddleware(app)
setupRoutes(app)
