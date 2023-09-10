import { model, Schema } from 'mongoose'
import { CreateUserType } from '../schemas/auth.schema'

const userSchema = new Schema<CreateUserType>(
  {
    user: {
      name: {
        type: String
      },
      email: {
        type: String,
        required: true
      }
    },
    uid: {
      type: String,
      required: true
    },
    myLux: [Object]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = model('users', userSchema)

export default UserModel
