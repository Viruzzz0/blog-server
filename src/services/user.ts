import UserModel from '../models/userModels'
import { CreateUserType, UpdateUserParamsType, UpdateUserBodyType, UpdateUserFileType, GetUserParamsType } from '../schemas/auth.schema'
import imageCompressed from './imageCompression'
import { randomUUID } from 'crypto'

interface interUserLuxProps {
  body: UpdateUserBodyType
  params: UpdateUserParamsType
  file?: UpdateUserFileType
}

export const interUser = async (item: CreateUserType): Promise<CreateUserType> => {
  const responseInsert = await UserModel.create(item)
  return responseInsert
}

export const interUserLux = async ({ body, params, file }: interUserLuxProps): Promise<CreateUserType | null> => {
  const responseMDB = await UserModel.findOne(params)
  const prevMylux = [...(responseMDB?.myLux ?? [])]
  const imageCompressedBuffer = await imageCompressed(file)

  const newLux = {
    ...body,
    id: randomUUID(),
    image: {
      imageOriginal: file,
      imageOptimized: typeof imageCompressedBuffer === 'undefined' ? undefined : imageCompressedBuffer
    }
  }

  const newEntry = {
    myLux: [
      ...prevMylux,
      newLux
    ]
  }

  const responseInsert = await UserModel.findOneAndUpdate(params, newEntry, { new: true })
  return responseInsert
}

export const getAllUsers = async (): Promise<CreateUserType[]> => {
  const users = await UserModel.find()
  return users
}

export const getOneUser = async (params: GetUserParamsType): Promise<CreateUserType | null> => {
  const filter = {
    'myLux.text': 1,
    'myLux.date': 1,
    'myLux.image.imageOptimized': 1,
    user: 1,
    uid: 1,
    _id: 0
  }
  const user = await UserModel.findOne(params, filter)

  return user
}
