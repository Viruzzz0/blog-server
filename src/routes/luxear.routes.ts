import { Router } from 'express'
import multer from 'multer'

import { getLuxers, postLux } from '../controllers/luxer.controller'
import { CreateLuxSchema, GetLuxersSchema } from '../schemas/luxer.schema'
import { schemaValidation } from '../middlewares/schemaValidator.middleware'

const router = Router()
const upload = multer()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.post('/luxers', upload.single('file'), schemaValidation(CreateLuxSchema), postLux)
router.get('/luxers/:number', schemaValidation(GetLuxersSchema), getLuxers)

export { router }
