import express from 'express'
import setupMiddleware from './middlewares'

export const app = express()
setupMiddleware(app)
