export type modificatorType = 'reduce_decrypt_time' | 'reduce_analyse_time' | 'reduce_EX_time' | 'add_artifact_level' |'add_par_level' | 'add_box_level' | 'get_quest_reroll' | "reduce_action_time" | 'nakano_bonus' | 'mult_XP' | 'mult_XP_std' | 'mult_XP_taiko' |'mult_XP_mania' | "mult_XP_catch" | "mult_EX" | 'mult_money_earned' | 'mult_int' | 'add_max_level' | 'add_luck';


export interface modificator {
  origin:string
  type:modificatorType
  value:number
  expirationTimestamp?:number
}
