import { DataTypes, Sequelize } from 'sequelize'
import { ModelStatic } from 'sequelize/types/model'
import { VehicleOrmModel } from './model/vehicle.orm.model'
import { StateLogOrmModel } from './model/stateLog.orm.model'
import { AppOrmModel } from './model/app.orm.model'

const initialiseVehicle = (sequelize: Sequelize): ModelStatic<VehicleOrmModel> =>
  sequelize.define<VehicleOrmModel>(
    'vehicle',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      make: { type: DataTypes.STRING },
      model: { type: DataTypes.STRING },
      state: { type: DataTypes.STRING }
    },
    { timestamps: false }
  )

const initialiseStateLog = (sequelize: Sequelize): ModelStatic<StateLogOrmModel> => {
  const StateLog = sequelize.define<StateLogOrmModel>(
    'stateLog',
    {
      vehicleId: { type: DataTypes.INTEGER },
      state: { type: DataTypes.STRING },
      timestamp: { type: DataTypes.STRING }
    },
    { timestamps: false }
  )
  StateLog.removeAttribute('id')
  return StateLog
}

export const initializeModel = (sequelize: Sequelize): AppOrmModel => ({
  Vehicle: initialiseVehicle(sequelize),
  StateLog: initialiseStateLog(sequelize)
})
