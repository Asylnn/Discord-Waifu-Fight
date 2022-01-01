
export type mapGenre = 'jumps' | 'streams' | 'unknown'
export interface beatmap {
  beatmapSetId:number
  id:number
  genre:string
  language:string
  mapGenre:mapGenre
}
