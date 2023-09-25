import { z } from 'zod'

const imageOptimizedSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Uint8Array),
  size: z.number()
})

export const imageOriginalSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Uint8Array),
  size: z.number()
})

export const luxerSchema = z.object({
  text: z.string(),
  date: z.string().datetime(),
  image: z.object({
    imageOptimized: imageOptimizedSchema,
    imageOriginal: imageOriginalSchema
  }).optional()
})

export const GetLuxersSchema = z.object({
  params: z.object({
    number: z.string()
  })
})

export const CreateLuxSchema = z.object({
  body: z.object({
    text: z.string(),
    date: z.string().datetime()
  }),
  file: imageOriginalSchema.optional()
})

export const luxerSchemaWithId = luxerSchema.extend({
  id: z.string() // Puedes cambiar el tipo de "id" según tus necesidades
})

export const ResponseLuxersSchema = z.array(luxerSchema)

export type GetLuxersParamsType = z.infer<typeof GetLuxersSchema>['params']
export type GetLuxersType = z.infer<typeof luxerSchema>

export type CreateLuxAndIdType = z.infer<typeof luxerSchemaWithId>

// export interface CreateLuxAndIdType extends GetLuxersType {
//   id: String
// }

export type ResponseLuxerstype = z.infer<typeof ResponseLuxersSchema>

export type CreateLuxBodyType = z.infer<typeof CreateLuxSchema>['body']
export type CreateLuxFileType = z.infer<typeof CreateLuxSchema>['file']

// export type CreateUserType = z.infer<typeof CreateUserSchema>['body']
// export type UpdateUserBodyType = z.infer<typeof UpdateUserSchema>['body']
// export type CreateUserQueryType = z.infer<typeof CreateUserSchema>['body']
