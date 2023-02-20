import { InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export interface StateLogOrmModel extends Model<InferAttributes<StateLogOrmModel>, InferCreationAttributes<StateLogOrmModel>> {
  vehicleId: number
  state: string
  timestamp: string
}
