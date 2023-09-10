import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes/luxear.routes'
import userRoutes from './routes/user.routes'
import './db'

// ServerConnection()

const PORT = process.env.PORT ?? 3001
const app = express()

app.use(cors({
  origin: '*'
}))

app.use(express.json())
app.use('/api', router)
app.use('/api', userRoutes)

const server = app.listen(PORT, () =>
  console.log(`Server is listening http://localhost:${PORT}`)
)

export { app, server }
