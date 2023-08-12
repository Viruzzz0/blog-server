export interface NewLuxEntry {
  date: Date
  text?: string
  image: {
    imageOptimized?: ImageData
    imageOriginal?: ImageData
  }
}

export interface ImageData {
  originalname: string
  mimetype: string
  encoding: string
  buffer: Uint8Array
}
