import tinify from 'tinify'
import { UpdateUserFileType } from '../schemas/auth.schema'

const { KEY_TINIFY } = process.env

if (typeof KEY_TINIFY === 'undefined') {
  throw new Error('KEY_TINIFY no está definida en las variables de entorno.')
}

tinify.key = KEY_TINIFY

const imageCompressed = async (file: UpdateUserFileType): Promise<UpdateUserFileType | undefined> => {
  if (typeof file === 'undefined') return

  const format = file.originalname.split('.').pop()

  if (format === 'gif' || format === 'webp') return file
  try {
    const compressedImageBuffer = await tinify.fromBuffer(file.buffer).toBuffer()

    return {
      ...file,
      buffer: compressedImageBuffer
    }
  } catch (error) {
    throw new Error('Error al comprimir la imagen con TinyPNG')
  }
}

export default imageCompressed
