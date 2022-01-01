export type actionType = 'exploration' | 'analyse' | 'decryption' | 'dungeon' | 'mining' | 'cafe'
export interface action {
  createdTimestamp: number
  timeWaiting: number
  type: actionType
  lvl:number
}
