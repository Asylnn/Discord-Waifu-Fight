export type questType = "quest_box" | "std" | "mania" | "taiko" | "fruits" | "quest_money" | 'do_exploration' | 'decrypt_parchement' | 'analyse_artifact'

export interface quest {
  generalType: 'claim' | 'other'
  type: string
  difficulty: number
  state: number
  objective: number
  name: string
}
