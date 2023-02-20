import { initialiseTestDatabase } from '../utils/initialiseTestDatabase'
import { getStateLog } from './StateLog'
import { AppOrmModel } from '../orm/model/app.orm.model'
import { StateLog } from '../model/stateLog.model'

let testModel: Promise<AppOrmModel>

const ids = [2, 3]
const timestamps = ['2022-09-10 14:59:01+00', '2023-01-01 00:00:00+00']
const expectedResults = ['quoted', 'sold']

beforeAll(async () => (testModel = initialiseTestDatabase()))

describe('getStateLog', () => {
  for (const [index, id] of ids.entries()) {
    test(`result is as expected for id: ${id} and timestamp: ${timestamps[index]}`, async () => {
      const stateLog: StateLog = await getStateLog({
        id,
        timestamp: timestamps[index],
        model: testModel
      })
      expect(stateLog.state).toEqual(expectedResults[index])
    })
  }

  test('result is as expected for timestamp before the first stateLog', async () => {
    const stateLog: StateLog = await getStateLog({
      id: 1,
      timestamp: '2022-08-10 00:00:00+00',
      model: testModel
    })
    expect(stateLog).not.toBeDefined()
  })
})
