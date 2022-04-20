import gamemode from './gamemode'

export type mapGenre = 'jumps' | 'streams' | 'burst' | 'tech' | 'alt' | 'reading' | 'unknown' | 'mixed'
export interface beatmap {
  beatmapSetId:number
  id:number
  genre:{id:number, name:string}
  language:{id:number, name:string}
  mapGenre:mapGenre
  mapGenreAuthor:string | null
  gamemode: gamemode
  starRating: number
}
