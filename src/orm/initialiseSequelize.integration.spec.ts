import { initialiseTestDatabase } from '../utils/initialiseTestDatabase'
import { StateLog } from '../model/stateLog.model'
import { Vehicle } from '../model/vehicle.model'
import { AppOrmModel } from './model/app.orm.model'

let testModel: AppOrmModel

beforeAll(async () => (testModel = await initialiseTestDatabase()))

describe('ORM Integration Test', () => {
  test('ORM is initialised', async () => {
    expect(testModel.Vehicle).toBeDefined()
    expect(testModel.StateLog).toBeDefined()
  })

  test('Vehicle finders work as expected', async () => {
    const vehicle: Vehicle = await testModel.Vehicle.findByPk(1)
    expect(vehicle.id).toEqual(1)
    expect(vehicle.make).toEqual('BMW')
    expect(vehicle.model).toEqual('X1')
    expect(vehicle.state).toEqual('quoted')
  })

  test('StateLogs finder works as expected', async () => {
    const stateLogs: StateLog[] = await testModel.StateLog.findAll({ where: { vehicleId: 3 } })
    expect(stateLogs.length).toBe(3)
    expect(stateLogs[0].state).toEqual('quoted')
    expect(stateLogs[1].state).toEqual('selling')
    expect(stateLogs[2].state).toEqual('sold')
    expect(stateLogs[2].timestamp).toEqual('2022-09-12 12:41:41+00')
  })
})
