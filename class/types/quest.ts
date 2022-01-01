export type questType = "quest_box" | "std" | "mania" | "taiko" | "fruits" | "quest_money" | 'do_exploration' | 'decrypt_parchement' | 'analyse_artifact' | 'finish_dungeon' | 'do_maid_cafe' | 'go_mining'

export interface quest {
  generalType: 'claim' | 'other'
  type: questType
  difficulty: number
  state: number
  objective: number
  name: string
}
