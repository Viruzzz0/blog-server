import { type NewLuxEntry } from './types'

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

const isString = (text: string): boolean => {
  return typeof text === 'string'
}

const isDate = (text: string): boolean => {
  return Boolean(Date.parse(text))
}

export const toNewLuxEntry = (object: any): NewLuxEntry => {
  const entry: NewLuxEntry = {
    text: parseText(object.message),
    date: parseDate(object.date),
    image: object.file
  }
  return entry
}
