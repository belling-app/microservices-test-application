import 'dotenv/config'
import envVars from './config/envVariables'
import express from 'express'
import logger from 'morgan'
import usersRouter from './routes/users.routes'
import { dbConnection } from './db/dbConnection'

const app = express()

app.use(express.json())
app.use(logger('dev'))

// Routes
app.use('/', usersRouter)

// TODO error handling

dbConnection()
  .then(() => {
    app.listen(envVars.PORT, () => {
      console.log(`[🚀] Service running on port ${envVars.PORT}`)
    })
  })
  .catch(() => {
    console.error('[❌] Service can not run if database is not connected.')
    process.exit(1)
  })
