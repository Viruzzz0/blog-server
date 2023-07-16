import mongoose from 'mongoose'

const ServerConnection = (): void => {
  const { USER_PASSWORD, DB_STORE } = process.env

  if (USER_PASSWORD === undefined || DB_STORE === undefined) {
    throw new Error('USER_PASSWORD o DB_STORE no está definida en las variables de entorno.')
  }

  const url = `mongodb+srv://milanesa:${USER_PASSWORD}@luxer.rfoaz85.mongodb.net/${DB_STORE}?retryWrites=true&w=majority`

  mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.log(err))
}

export default ServerConnection
