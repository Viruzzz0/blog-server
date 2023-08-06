import { Router } from 'express'
import multer from 'multer'
import LuxerModels from '../../models/luxerModels'
import { toNewLuxEntry } from '../utils'

const router = Router()
const upload = multer()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.post('/luxear', upload.single('file'), async (req, res) => {
  try {
    const { message, date } = req.body

    if (message.length === 0 && req.file === undefined) {
      res
        .status(406)
        .send({ message: 'invalid entry, the object does not contain text and image' })
      return
    }
    const newLuxEntry = await toNewLuxEntry({ message, date, file: req.file })
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
  } catch (err) {
    console.log(err)
  }
})

router.get('/lux/:number', async (req, res): Promise<void> => {
  try {
    const numberElements = parseInt(req.params.number)

    // const allLux = await LuxerModels.find({})
    const allLux = await LuxerModels.find({}, { 'image.imageOptimized': 1, text: 1, date: 1, _id: 0 })
      .sort({ _id: -1 }).limit(numberElements)

    res.status(200).send(allLux)
  } catch (err) {
    console.log(err)
    res.status(400).send('Error interno del servidor')
  }
})

export { router }
