import multer from 'multer'
import { Router } from 'express'
import { createUser, getUser, getUsers, updateUser } from '../controllers/user.controller'
import { schemaValidation } from '../middlewares/schemaValidator.middleware'
import { CreateUserSchema, UpdateUserSchema, GetUserSchema } from '../schemas/auth.schema'

const router = Router()
const upload = multer()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/user/:uid', schemaValidation(GetUserSchema), getUser)
router.get('/users', getUsers)
router.post('/user', schemaValidation(CreateUserSchema), createUser)
router.put('/user/:uid', upload.single('file'), schemaValidation(UpdateUserSchema), updateUser)

export default router
