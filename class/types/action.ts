export type actionType = 'exploration' | 'analyse' | 'decryption' | 'dungeon'
export interface action {
  createdTimestamp: number
  timeWaiting: number
  type: actionType
  lvl:number
}
