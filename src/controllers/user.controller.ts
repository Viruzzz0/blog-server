import { Request, Response } from 'express'
import { CreateUserType, UpdateUserBodyType, UpdateUserParamsType, GetUserParamsType } from '../schemas/auth.schema'
import { interUser, interUserLux, getAllUsers, getOneUser } from '../services/user'

type createUserType = (
  req: Request<unknown, unknown, CreateUserType>,
  res: Response
) => Promise<void>

type updateUserType = (
  req: Request<UpdateUserParamsType, unknown, UpdateUserBodyType>,
  res: Response
) => Promise<void>

type getUsersType = (
  req: Request,
  res: Response
) => Promise<void>

type getUserType = (
  req: Request<GetUserParamsType>,
  res: Response
) => Promise<void>

export const createUser: createUserType = async (req, res) => {
  const responseItem = await interUser(req.body)
  console.log('Creating user')
  res.send(responseItem)
}

export const updateUser: updateUserType = async ({ body, params, file }, res) => {
  const responseItem = await interUserLux({ body, params, file })

  if (responseItem == null) {
    res.status(404).send({ message: 'User not found' })
    return
  }
  console.log('Updating user')
  res.send(responseItem)
}

export const getUsers: getUsersType = async (_req, res) => {
  const users = await getAllUsers()
  res.send(users)
}

export const getUser: getUserType = async (req, res) => {
  const users = await getOneUser(req.params)
  res.send(users)
}

// import { Request, Response } from 'express'
// import { CreateUserType, UpdateUserBodyType, UpdateUserParamsType } from '../schemas/auth.schema'
// import { interUser } from '../services/interUser'
// import { interLux } from '../services/interLux'

// export const createUser = async (
//   req: Request<unknown, unknown, CreateUserType>,
//   res: Response
// ): Promise<void> => {
//   const responseItem = await interUser(req.body)
//   console.log('Creating user')
//   res.send(responseItem)
// }

// export const updateUser = async (
//   req: Request<UpdateUserParamsType, unknown, UpdateUserBodyType>,
//   res: Response
// ): Promise<void> => {
//   console.log('Updating user')
//   const responseItem = await interLux(req.body, req.params)

//   if (responseItem == null) {
//     res.status(404).send({ message: 'User not found' })
//     return
//   }
//   res.send(responseItem)
// }
