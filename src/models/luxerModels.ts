import { model, Schema } from 'mongoose'
import { CreateLuxAndIdType } from '../schemas/luxer.schema'

// Crea un modelo de usuario
const luxerSchema = new Schema<CreateLuxAndIdType>(
  {
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    date: {
      type: String,
      required: true
    },
    image: {
      imageOptimized: {
        type: Object,
        required: false
      },
      imageOriginal: {
        type: Object,
        required: false
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const LuxerModels = model('luxers', luxerSchema)

export default LuxerModels
