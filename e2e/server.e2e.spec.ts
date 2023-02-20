import axios from 'axios'

import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import app from '../src/app'
import http from 'http'

const TEST_SERVER_PORT = 4001

const ids = [1, 1, 1, 2, 2, 2, 3, 3, 3, 3]
const timestamps = [
  '2022-09-01 00:00:00+00',
  '2022-09-10 10:23:54+00',
  '2022-09-11 00:00:00+00',
  '2022-09-11 16:00:00+00',
  '2022-09-11 17:03:17+00',
  '2022-09-11 18:00:00+00',
  '2022-09-12 11:00:00+00',
  '2022-09-12 12:41:41+00',
  '2022-09-13 00:00:00+00',
  'wrong'
]

const expectedStatusCodes = [
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK,
  StatusCodes.OK
]

const expectedStatusTexts = [
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK,
  ReasonPhrases.OK
]

let server: http.Server
beforeAll(async () => {
  server = app.listen({ port: TEST_SERVER_PORT }, () => console.log(`Test Server initialised on port: ${TEST_SERVER_PORT}`))
})

afterAll(() => {
  server.close()
})

describe('Server E2E tests', () => {
  describe('Vehicle E2E tests', () => {
    for (const [index, id] of ids.entries()) {
      test(`Expected Vehicle Info for id: ${id} and timestamp: ${timestamps[index]}`, async () => {
        const { status, statusText, data } = await axios({
          method: 'get',
          url: `http://localhost:${TEST_SERVER_PORT}/vehicle/`,
          data: {
            id,
            timestamp: timestamps[index]
          }
        })

        expect(status).toEqual(expectedStatusCodes[index])
        expect(statusText).toEqual(expectedStatusTexts[index])

        expect(data).toMatchSnapshot()
      })
    }

    test('Non existent ID', async () => {
      try {
        await axios({
          method: 'get',
          url: `http://localhost:${TEST_SERVER_PORT}/vehicle/`,
          data: {
            id: -1,
            timestamp: timestamps[0]
          }
        })
      } catch (error) {
        expect(error).toBeDefined()
      }
    })

    test('Wrong format ID', async () => {
      try {
        await axios({
          method: 'get',
          url: `http://localhost:${TEST_SERVER_PORT}/vehicle/`,
          data: {
            id: 'wrong',
            timestamp: timestamps[0]
          }
        })
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
  describe('Health Check E2E tests', () => {
    test('Expected response for Health Check', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/`
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })
  })
})
