
import {modificator} from "../types/modificator";
import item from './item'

export default class consumableUser extends item {
  private effects: Array<modificator>

  //Generating a new instance
  constructor(id: string, name: string, description:string, rarity: number, value: number, img:string, effects: Array<modificator>){
      super(id, name, description, rarity, value, img)
      this.effects = effects
  }
}