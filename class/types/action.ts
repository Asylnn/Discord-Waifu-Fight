export type actionType = 'exploration' | 'analyse' | 'decryption'
export interface action {
  createdTimestamp: number
  timeWaiting: number
  type: actionType
  isDoingAction: boolean
  lvl:number
}
