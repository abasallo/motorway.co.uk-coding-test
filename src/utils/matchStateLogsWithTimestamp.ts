import { StateLog } from '../model/stateLog.model'

export const matchStateLogsWithTimestamp = (stateLogs: StateLog[], queryTimestamp: string): StateLog | undefined => {
  const queryTime: number = new Date(queryTimestamp).getTime()
  let result: StateLog
  for (const stateLog of stateLogs) {
    const stateLogTime: number = new Date(stateLog.timestamp).getTime()
    if (stateLogTime <= queryTime) {
      if (!result) {
        result = stateLog
      } else {
        const currentResultTime = new Date(result.timestamp).getTime()
        const distanceToCurrentResult = queryTime - currentResultTime
        const distanceToCandidateResult = queryTime - stateLogTime
        if (distanceToCandidateResult < distanceToCurrentResult) {
          result = stateLog
        }
      }
    }
  }
  return result
}
