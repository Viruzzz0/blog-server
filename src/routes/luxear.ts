import { Router } from 'express'
import multer from 'multer'
import LuxerModels from '../../models/luxerModels'
import { toNewLuxEntry } from '../utils'

const router = Router()
const upload = multer()

router.post('/api/luxear', upload.single('file'), (req, res) => {
  const newLuxEntry = toNewLuxEntry({ ...req.body, file: req.file })
  const file = req.file

  const luxObj = {
    text: newLuxEntry.text,
    date: newLuxEntry.date,
    imagen: { ...file }
  }

  const newLux = new LuxerModels(luxObj)

  newLux
    .save()
    .then(() => console.log('File saved!'))
    .catch(err => console.log(err))

  res.send({ data: 'Api rest' })
})

// router.get('/api/lux', async (_req, res) => {
//   try {
//     const user = await LuxerModels.find({})
//     res.status(200).send(user)
//   } catch (err) {
//     console.log(err)
//   }
// })

export { router }
