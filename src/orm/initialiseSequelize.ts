import { Sequelize } from 'sequelize'

import { initializeModel } from './initialiseModel'

import { AppOrmModel } from './model/app.orm.model'

export const initialiseSequelize = async (CONNECTION_URL: string): Promise<AppOrmModel> => {
  const sequelize: Sequelize = new Sequelize(CONNECTION_URL)
  const model = initializeModel(sequelize)
  await sequelize.sync()
  return model
}
