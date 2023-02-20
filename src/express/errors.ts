import { Request, Response, NextFunction } from 'express'
import HttpStatus, { ReasonPhrases } from 'http-status-codes'

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`Error: ${err} - Request: ${req} - Response: ${res}`)
  res.status(HttpStatus.INTERNAL_SERVER_ERROR)
  res.send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  next(err)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function errorWrapper(f: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    f(req, res, next).catch(next)
  }
}
