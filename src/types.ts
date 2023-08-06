export interface NewLuxEntry {
  date: Date
  text?: string
  image: Promise<Uint8Array>
}
