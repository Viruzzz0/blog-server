import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes/luxear'
import ServerConnection from './db'

ServerConnection()

const PORT = process.env.PORT ?? 3001
const app = express()

app.use(cors({
  origin: '*'
}))

app.use(express.json())
app.use(router)

app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
)
