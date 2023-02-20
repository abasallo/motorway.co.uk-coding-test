import HttpStatus from 'http-status-codes'

import { Request, Response, Router } from 'express'

import { model } from '../../app'

import { getVehicle } from '../../services/Vehicle'
import { getStateLog } from '../../services/StateLog'

import { Vehicle } from '../../model/vehicle.model'
import { StateLog } from '../../model/stateLog.model'
import { errorWrapper } from '../errors'
import { cache, cacheMiddleware } from '../cache'

const router = Router()

const composeResponseData = async (req: Request) => {
  const id: number = parseInt(req.body.id)
  const timestamp: string = req.body.timestamp

  const vehicle: Vehicle = await getVehicle({ id, model })
  const stateLog: StateLog = await getStateLog({ id, timestamp, model })

  if (!vehicle) {
    return undefined
  } else {
    return {
      vehicle,
      timestamp,
      state: stateLog ? stateLog.state : undefined
    }
  }
}

router.get(
  '/',
  cacheMiddleware,
  errorWrapper(async (req: Request, res: Response) => {
    const data = await composeResponseData(req)
    if (!data) {
      res.status(HttpStatus.NOT_FOUND)
    } else {
      const key = JSON.stringify(req.body)
      cache.set(key, data)
      res.send(data)
    }
  })
)

export default router
