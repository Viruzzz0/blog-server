import { type NewLuxEntry } from './types'
import tinify from 'tinify'

tinify.key = 'NjQBXFBwb01L863NCjQDrLX1z8YczFdz'

const parseText = (textFromRequest: any): string => {
  if (!isString(textFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return textFromRequest
}

const parseDate = (dateFromRequest: any): Date => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return dateFromRequest
}

const parseImage = async (file: any): Promise<Uint8Array | null> => {
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

const isString = (text: string): boolean => {
  return typeof text === 'string'
}

const isDate = (text: string): boolean => {
  return Boolean(Date.parse(text))
}

export const toNewLuxEntry = async (object: any): Promise<NewLuxEntry> => {
  const entry: NewLuxEntry = {
    text: parseText(object.message),
    date: parseDate(object.date),
    image: {
      imageOptimized: typeof object.file === 'undefined' ? null : await parseImage(object.file),
      imageOriginal: object.file
    }
  }
  return entry
}
