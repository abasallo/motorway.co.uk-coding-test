import { Vehicle } from '../model/vehicle.model'
import { AppOrmModel } from '../orm/model/app.orm.model'

export const getVehicle = async ({ id, model }: { id: number; model: Promise<AppOrmModel> }): Promise<Vehicle> => {
  const appOrmModel: AppOrmModel = await model
  const vehicle: Vehicle = await appOrmModel.Vehicle.findByPk(id)
  if (!vehicle) {
    throw new Error(`Cannot find a Vehicle with id: ${id}.`)
  }
  return vehicle
}
