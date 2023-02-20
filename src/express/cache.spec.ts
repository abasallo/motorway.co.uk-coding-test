import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import { cache, cacheMiddleware } from './cache'

describe('Cache Middleware', () => {
  test('cacheMiddleware', () => {
    const req = {
      body: { test: 'test' }
    } as Request

    const status = jest.fn()
    const res = {
      status: jest.fn(),
      send: jest.fn(() => ({ status }))
    } as unknown as Response

    const next = jest.fn()

    const data = 'data'

    cacheMiddleware(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()

    cache.set(JSON.stringify(req.body), data)
    cacheMiddleware(req, res, next)

    expect(res.send).toHaveBeenCalledWith(data)
    expect(status).toHaveBeenCalledWith(HttpStatus.OK)
  })
})
