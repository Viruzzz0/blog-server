import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const schemaValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(error.issues.map((issues) => ({
            path: issues.path,
            message: issues.message
          })))
      }
      return res.status(400).json({ message: 'Internal server error' })
    }
  }
