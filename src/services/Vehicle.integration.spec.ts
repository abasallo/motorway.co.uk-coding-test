import { initialiseTestDatabase } from '../utils/initialiseTestDatabase'
import { getVehicle } from './Vehicle'
import { Vehicle } from '../model/vehicle.model'
import { AppOrmModel } from '../orm/model/app.orm.model'

let testModel: Promise<AppOrmModel>

const ids = [1, 2, 3]
const makes = ['BMW', 'AUDI', 'VW']
const models = ['X1', 'A4', 'GOLF']
const states = ['quoted', 'selling', 'sold']

beforeAll(async () => (testModel = initialiseTestDatabase()))

describe('getVehicle', () => {
  for (const [index, id] of ids.entries()) {
    test(`make is as expected for id: ${id}`, async () => {
      const vehicle: Vehicle = await getVehicle({
        id,
        model: testModel
      })
      expect(vehicle.make).toEqual(makes[index])
    })
    test(`model is as expected for id: ${id}`, async () => {
      const vehicle: Vehicle = await getVehicle({
        id,
        model: testModel
      })
      expect(vehicle.model).toEqual(models[index])
    })
    test(`state is as expected for id: ${id}`, async () => {
      const vehicle: Vehicle = await getVehicle({
        id,
        model: testModel
      })
      expect(vehicle.state).toEqual(states[index])
    })
  }
})
