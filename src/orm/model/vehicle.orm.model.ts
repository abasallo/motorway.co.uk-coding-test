import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export interface VehicleOrmModel extends Model<InferAttributes<VehicleOrmModel>, InferCreationAttributes<VehicleOrmModel>> {
  id: CreationOptional<number>
  make: string
  model: string
  state: string
}
