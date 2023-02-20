import { initialiseSequelize } from '../orm/initialiseSequelize'
import { AppOrmModel } from '../orm/model/app.orm.model'

const TEST_CONNECTION_URL = 'sqlite://motorway-takehome-backend.test.sqlite'

let testModel: AppOrmModel

const destroyTestDatabase = (): Promise<[number, number]> =>
  Promise.all([testModel.Vehicle.destroy({ truncate: true }), testModel.StateLog.destroy({ truncate: true })])

export const initialiseTestDatabase = async (): Promise<AppOrmModel> => {
  testModel = await initialiseSequelize(TEST_CONNECTION_URL)

  await destroyTestDatabase()

  await Promise.all([
    testModel.Vehicle.create({ id: 1, make: 'BMW', model: 'X1', state: 'quoted' }),
    testModel.Vehicle.create({ id: 2, make: 'AUDI', model: 'A4', state: 'selling' }),
    testModel.Vehicle.create({ id: 3, make: 'VW', model: 'GOLF', state: 'sold' }),

    testModel.StateLog.create({ vehicleId: 1, state: 'quoted', timestamp: '2022-09-10 10:23:54+00' }),
    testModel.StateLog.create({ vehicleId: 2, state: 'quoted', timestamp: '2022-09-10 14:59:01+00' }),
    testModel.StateLog.create({ vehicleId: 2, state: 'selling', timestamp: '2022-09-11 17:03:17+00' }),
    testModel.StateLog.create({ vehicleId: 3, state: 'quoted', timestamp: '2022-09-11 09:11:45+00' }),
    testModel.StateLog.create({ vehicleId: 3, state: 'selling', timestamp: '2022-09-11 23:21:38+00' }),
    testModel.StateLog.create({ vehicleId: 3, state: 'sold', timestamp: '2022-09-12 12:41:41+00' })
  ])

  return testModel
}
