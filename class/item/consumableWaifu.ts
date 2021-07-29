import effect from '../types/effect'
import item from './item'

export default class consumableWaifu extends item {
  public readonly objectType = "consumableWaifu"

  public effects: Array<effect>

  //Generating a new instance
  constructor(id: string, name: string, description:string, rarity: number, value: number, img:string, effects: Array<effect>){
      super(id, name, description, rarity, value, img)
      this.effects = effects
  }
}
