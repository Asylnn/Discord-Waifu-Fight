export type ActionType = 'exploration' | 'analyse' | 'decryption' | 'dungeon' | 'mining' | 'cafe'
export interface Action {
  createdTimestamp: number
  timeWaiting: number
  type: ActionType
  lvl:number
}
