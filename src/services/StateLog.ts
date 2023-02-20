import { StateLog } from '../model/stateLog.model'

import { matchStateLogsWithTimestamp } from '../utils/matchStateLogsWithTimestamp'
import { AppOrmModel } from '../orm/model/app.orm.model'

export const getStateLog = async ({
  id,
  timestamp,
  model
}: {
  id: number
  timestamp: string
  model: Promise<AppOrmModel>
}): Promise<StateLog> => {
  const appOrmModel: AppOrmModel = await model
  const stateLogs: StateLog[] = await appOrmModel.StateLog.findAll({ where: { vehicleId: id } })
  return matchStateLogsWithTimestamp(stateLogs, timestamp)
}
