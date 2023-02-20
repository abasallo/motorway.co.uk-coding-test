import { StateLog } from '../model/stateLog.model'
import { matchStateLogsWithTimestamp } from './matchStateLogsWithTimestamp'

const stateLogs: StateLog[] = [
  {
    vehicleId: 3,
    state: 'quoted',
    timestamp: '2022-09-11 09:11:45+00'
  },
  {
    vehicleId: 3,
    state: 'selling',
    timestamp: '2022-09-11 23:21:38+00'
  },
  {
    vehicleId: 3,
    state: 'sold',
    timestamp: '2022-09-12 12:41:41+00'
  }
]

const timestamps: string[] = [
  '2022-09-10 09:11:45+00',
  '2022-09-11 09:11:45+00',
  '2022-09-11 10:00:00+00',
  '2022-09-11 23:21:38+00',
  '2022-09-11 23:30:00+00',
  '2022-09-12 12:41:41+00',
  '2022-09-12 12:45:00+00'
]

const expectedResults = [undefined, 'quoted', 'quoted', 'selling', 'selling', 'sold', 'sold']

describe('matchStateLogsWithTimestamp', () => {
  for (const [index, timestamp] of timestamps.entries()) {
    test(`Result is as expected: ${expectedResults[index]} for timestamp: ${timestamp}`, () => {
      expect(matchStateLogsWithTimestamp(stateLogs, timestamp)?.state).toEqual(expectedResults[index])
    })
  }
})
