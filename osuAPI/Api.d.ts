type gamemode = 'osu' | 'taiko' | 'fruits' | 'mania'
type offset = number
type rankStatus = "-2" | "-1" | "0" | "1" | "2" | "3" | "4"

interface score {
  id:number
  best_id:number
  user_id:number
  accuracy:number
  mods:Array<string>
  score:number
  max_combo:number
  perfect:boolean
  statistics: {
    count_50:number,
    count_100: number,
    count_300: number,
    count_geki:number,
    count_katu:number,
    count_miss:number
  }
  pp:number
  rank:number
  created_at:number
  mode:gamemode
  mode_int:gamemode
  replay:boolean
}

interface scoreGetUserScores extends score {
  beatmap: beatmap
  beatmapset: any
  user: any
  weight?:number
}

interface beatmapCompact {
  difficulty_rating: number
  id: number
  mode: gamemode
  status:rankStatus
  total_length:number
  version: string
}

interface beatmap extends beatmapCompact{
  accuracy: string
  ar: number
  cs: number
  beatmapset_id: number
  bpm: float
  convert: boolean
  count_circles: number
  count_sliders: number
  count_spinners:number
  deleted_at: number
  last_updated: number
  drain: number
  hit_length:number
  is_scoreable: boolean
  mode_int: number
  passcount: number
  ranked: rankStatus
  url: string
}

interface covers {
  toEdit: string
}

interface beatmapsetCompact {
  artist: string
  artist_unicode: string
  covers:covers
  creator:string
  favorite_count:string
  id:number
  nsfw:boolean
  play_count:number
  preview_url:string
  source:string
  status:string
  title:string
  title_unicode:string
  user_id:number
  video:string
}

interface beatmapsetCompactExtended extends beatmapsetCompact{
  beatmaps: beatmap[]
  converts: beatmap[]
  current_user_attributes: null
  description: {
    description: string
  }
  genre :{
    id:number
    name: string
  }
  language :{
    id:number
    name: string
  }
  ratings: [number, number, number, number, number, number, number, number, number, number, number]
  recent_favorites:null
  user:null
}

interface beatmapset extends beatmapsetCompactExtended {
  availability: {
    download_disabled:boolean
    more_information: null
  }
  bpm: number
  can_be_hyped: boolean
  discussion_enabled: boolean
  discussion_locked:boolean
  hype: {
    current:number
    required:number
  }
  is_scoreable:boolean
  last_updated:number
  legacy_thread_url:string
  nominations:{
    current:number
    required:number
  }
  ranked:rankedStatus
  ranked_date:number
  source: string
  storyboard: boolean
  submitted_date: number
  tags: string
}

export default class api {
  constructor(clientId: number, clientSecret:string)
  getBeatmap(object: {beatmapId: number}): Promise<beatmap>
  getBeatmapSet(object: {beatmapsetId: number}): Promise<beatmapset>
  getUserScores(object: {userId:number, gamemode?:gamemode, includeFails?:boolean, type:"recent" | "best" | "firsts", limit?:number, offset?:offset}): Promise<Array<scoreGetUserScores>>
}
