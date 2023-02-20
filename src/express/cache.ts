import NodeCache from 'node-cache'

import { Request, Response, NextFunction } from 'express'

import HttpStatus from 'http-status-codes'

let stdTTL: number
try {
  stdTTL = parseInt(process.env.ORM_CACHE_TTL)
} catch {
  stdTTL = 60
}

export const cache = new NodeCache({ stdTTL })

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = JSON.stringify(req.body)
    if (cache.has(key)) {
      return res.send(cache.get(key)).status(HttpStatus.OK)
    }
    return next()
  } catch (err) {
    console.log(err)
    throw err
  }
}
