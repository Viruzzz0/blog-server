import { z } from 'zod'
import { imageOriginalSchema, luxerSchema } from './luxer.schema'

export const CreateUserSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string().nonempty(),
      email: z.string().email().nonempty()
    }),
    uid: z.string().nonempty(),
    myLux: z.array(luxerSchema).optional()
  })
})

export const UpdateUserSchema = z.object({
  body: z.object({
    text: z.string(),
    date: z.string().datetime()
  }),
  params: z.object({
    uid: z.string().min(5)
  }),
  file: imageOriginalSchema.optional()
})

export const GetUserSchema = z.object({
  params: z.object({
    uid: z.string()
  })
})

export type GetUserParamsType = z.infer<typeof GetUserSchema>['params']

export type CreateUserType = z.infer<typeof CreateUserSchema>['body']

export type UpdateUserBodyType = z.infer<typeof UpdateUserSchema>['body']
export type UpdateUserParamsType = z.infer<typeof UpdateUserSchema>['params']
export type UpdateUserFileType = z.infer<typeof UpdateUserSchema>['file']
