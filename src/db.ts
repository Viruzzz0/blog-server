import mongoose from 'mongoose'

const ServerConnection = (): void => {
  const { MONGODB_PASSWORD, MONGODB_DB, MONGODB_DB_TEST, NODE_ENV } = process.env

  const isTest = NODE_ENV === 'development' || NODE_ENV === 'test'
    ? MONGODB_DB_TEST
    : MONGODB_DB

  if (MONGODB_PASSWORD === undefined || isTest === undefined) {
    throw new Error('USER_PASSWORD o DB_STORE no está definida en las variables de entorno.')
  }

  const url = `mongodb+srv://milanesa:${MONGODB_PASSWORD}@luxer.rfoaz85.mongodb.net/${isTest}?retryWrites=true&w=majority`

  mongoose
    .connect(url)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.log(err))
}

export default ServerConnection
