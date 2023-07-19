import { Router } from 'express'
import multer from 'multer'
import LuxerModels from '../../models/luxerModels'
// import { type NewLuxEntry } from '../types'
import { toNewLuxEntry } from '../utils'

const router = Router()
const upload = multer()

router.post('/luxear', upload.single('file'), (req, res) => {
  const { message, date } = req.body

  if (message.length === 0 && req.file === undefined) {
    res
      .status(406)
      .send({ message: 'invalid entry, the object does not contain text and image' })
    return
  }

  const newLuxEntry = toNewLuxEntry({ message, date, file: req.file })
  const addLuxEntry = new LuxerModels(newLuxEntry)

  addLuxEntry
    .save()
    .then(() => {
      console.log('File saved!')
      res
        .status(200)
        .send({ message: 'Lux saved successfully' })
    })
    .catch(err => console.log(err))
})

router.get('/lux', async (_req, res): Promise<void> => {
  try {
    const allLux = await LuxerModels.find({})
    allLux.reverse()
    res.status(200).send(allLux)
  } catch (err) {
    console.log(err)
    res.status(400).send('Error interno del servidor')
  }
})

export { router }
