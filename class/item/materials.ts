import {modificator} from "../types/modificator";
import item from './item'

export default class materials extends item {

  //Generating a new instance
  constructor(id: string, name: string, description:string, rarity: number, value: number, img:string){
      super(id, name, description, rarity, value, img)
  }
}
