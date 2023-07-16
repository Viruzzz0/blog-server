interface NewLuxEntry {
  date: Date
  text?: string
  image?: Blob
}

const parseText = (text: string): string => {
  if (typeof text !== 'string') {
    throw new Error('Incorrect or missing comment')
  }
  return text
}

export const toNewLuxEntry = (object: any): NewLuxEntry => {
  const entry: NewLuxEntry = {
    text: parseText(object.message),
    date: object.date,
    image: object.file
  }
  return entry
}
