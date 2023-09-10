import mongoose from 'mongoose'

// const ServerConnection = async (): Promise<void> => {
const { MONGODB_PASSWORD, MONGODB_DB_STORE, MONGODB_DB_STORE_TEST, NODE_ENV } = process.env

const isTest = NODE_ENV === 'development' || NODE_ENV === 'test'
  ? MONGODB_DB_STORE_TEST
  : MONGODB_DB_STORE

if (MONGODB_PASSWORD === undefined || isTest === undefined) {
  throw new Error('MONGODB_PASSWORD o MONGODB_DB_STORE no está definida en las variables de entorno.')
}

const url = `mongodb+srv://milanesa:${MONGODB_PASSWORD}@luxer.rfoaz85.mongodb.net/${isTest}?retryWrites=true&w=majority`
// const urlUser = `mongodb+srv://milanesa:${MONGODB_PASSWORD}@luxer.rfoaz85.mongodb.net/user?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log(err))
