import LuxerModels from '../models/luxerModels'
import { CreateLuxAndIdType, CreateLuxBodyType, CreateLuxFileType, ResponseLuxerstype } from '../schemas/luxer.schema'
import imageCompressed from './imageCompression'
import { randomUUID } from 'crypto'

interface interLuxProps {
  body: CreateLuxBodyType
  file?: CreateLuxFileType
}

export const getLux = async (numberElements: number): Promise<ResponseLuxerstype> => {
  const responseGet = await LuxerModels.find({}, { 'image.imageOptimized': 1, text: 1, date: 1, id: 1, _id: 0 })
    .sort({ _id: -1 }).limit(numberElements)

  return responseGet
}

export const interLux = async ({ body, file }: interLuxProps): Promise<CreateLuxAndIdType> => {
  const imageCompressedBuffer = await imageCompressed(file)

  const newLux = {
    ...body,
    id: randomUUID(),
    image: {
      imageOriginal: file,
      imageOptimized: typeof imageCompressedBuffer === 'undefined' ? null : imageCompressedBuffer
    }
  }

  const responseItem = await LuxerModels.create(newLux)
  return responseItem
}

// export const interUserLux = async ({ body, params, file }: interUserLuxProps): Promise<CreateUserType | null> => {
//   const responseMDB = await UserModel.findOne(params)
//   const prevMylux = [...(responseMDB?.myLux ?? [])]
//   const imageCompressedBuffer = await imageCompressed(file)

//   const newLux = {
//     ...body,
//     id: randomUUID(),
//     image: {
//       imageOriginal: file,
//       imageOptimized: typeof imageCompressedBuffer === 'undefined' ? undefined : imageCompressedBuffer
//     }
//   }

//   const newEntry = {
//     myLux: [
//       ...prevMylux,
//       newLux
//     ]
//   }

//   const responseInsert = await UserModel.findOneAndUpdate(params, newEntry, { new: true })
//   return responseInsert
// }
