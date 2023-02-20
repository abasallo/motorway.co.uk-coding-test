import { errorMiddleware, errorWrapper } from './errors'
import { Request, Response } from 'express'
import HttpStatus, { ReasonPhrases } from 'http-status-codes'

describe('Error Middleware & Utils', () => {
  test('errorMiddleware', () => {
    const err = {} as Error
    const req = {} as Request
    const res = {
      status: jest.fn(),
      send: jest.fn()
    } as unknown as Response
    const next = jest.fn()

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR)
    expect(next).toHaveBeenCalledWith(err)
  })

  test('errorWrapper', () => {
    const catchMock = jest.fn()
    const f = jest.fn(() => {
      return { catch: catchMock }
    })

    const req = {} as Request
    const res = {} as Response
    const next = jest.fn()

    errorWrapper(f)(req, res, next)

    expect(f).toHaveBeenCalledWith(req, res, next)
    expect(catchMock).toHaveBeenCalledWith(next)
  })
})
