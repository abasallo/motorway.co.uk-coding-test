import { ModelStatic } from 'sequelize/types/model'
import { StateLogOrmModel } from './stateLog.orm.model'
import { VehicleOrmModel } from './vehicle.orm.model'

export interface AppOrmModel {
  Vehicle: ModelStatic<VehicleOrmModel>
  StateLog: ModelStatic<StateLogOrmModel>
}
