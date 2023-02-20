import { initialiseTestDatabase } from './initialiseTestDatabase'
import { AppOrmModel } from '../orm/model/app.orm.model'

let testModel: AppOrmModel

beforeAll(async () => (testModel = await initialiseTestDatabase()))

describe('initialiseTestDatabase', () => {
  test('DB should be properly initialized', async () => {
    expect(testModel).toBeDefined()
    expect(await testModel.Vehicle.count()).toEqual(3)
    expect(await testModel.StateLog.count()).toEqual(6)
  })
})
