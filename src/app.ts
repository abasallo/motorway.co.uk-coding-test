import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import index from './express/routes'
import vehicle from './express/routes/vehicle'

import { initialiseSequelize } from './orm/initialiseSequelize'
import { initialiseTestDatabase } from './utils/initialiseTestDatabase'
import { errorMiddleware } from './express/errors'
import { AppOrmModel } from './orm/model/app.orm.model'
dotenv.config()

export const app = express()

export const model: Promise<AppOrmModel> = process.env.CONNECTION_URL
  ? initialiseSequelize(process.env.CONNECTION_URL)
  : initialiseTestDatabase()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index)
app.use('/vehicle', vehicle)

app.use(errorMiddleware)

export default app
