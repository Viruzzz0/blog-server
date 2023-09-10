import { Request, Response } from 'express'
import { CreateLuxBodyType, GetLuxersParamsType } from '../schemas/luxer.schema'
import { getLux, interLux } from '../services/lux'

type getLuxersType = (
  req: Request<GetLuxersParamsType>,
  res: Response
) => Promise<void>

type postLuxType = (
  req: Request<unknown, unknown, CreateLuxBodyType>,
  res: Response
) => Promise<void>

export const postLux: postLuxType = async ({ body, file }, res) => {
  const responseItem = await interLux({ body, file })

  if (responseItem == null) {
    res.status(404).send({ message: 'Error creating lux' })
    return
  }
  console.log('New lux')
  res.send(responseItem)
}

export const getLuxers: getLuxersType = async (req, res) => {
  const numberElements = parseInt(req.params.number)
  const responseItem = await getLux(numberElements)

  res
    .status(200)
    .send(responseItem)
}
