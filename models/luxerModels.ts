import { model, Schema } from 'mongoose'

// Crea un modelo de usuario
const luxerSchema = new Schema({
  text: String,
  date: Date,
  image: {
    imageOptimized: {
      name: String,
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      buffer: Buffer,
      size: Number
    },
    imageOriginal: {
      name: String,
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      buffer: Buffer,
      size: Number
    }
  }
})

const LuxerModels = model('luxer', luxerSchema)

export default LuxerModels
