import modificatorType from './types/modificatorType'
import Message from './message'
import {MODIFICATOR_OPERATION} from '../files/config.json'
import User from '../class/user'
import Waifu from '../class/waifu'

export default class Modificator {
  public objectType = "modificator"
  public origin:string
  public type:modificatorType
  public value:number
  public expirationTimestamp?:number
  public valueIncrease?:[number, number]

  constructor(origin:string, type:modificatorType, value:number, valueIncrease?:[number, number]){
    this.origin = origin
    this.type = type
    this.value = value
    this.valueIncrease = valueIncrease
  }

  toString(message: Message){
    message;
    
    if(MODIFICATOR_OPERATION[this.type] == "multiplicative"){
      if(["reduce_explo_time", "reduce_analyse_time", "reduce_decrypt_time"].includes(this.type)){
        return `${eval(getLoc)(this.type)} : ${Math.round((1 - 1 / this.value)*100)}% \n`
      }
      else {
        return `${eval(getLoc)(this.type)} : ${Math.round(this.value*100 - 100)}% \n`
      }
    }
    else if(MODIFICATOR_OPERATION[this.type] == "additive"){
      return `${eval(getLoc)(this.type)} : +${this.value} \n`
    }
    else{
      if(this.type == "nakano_bonus")
        return eval(getLoc)(this.type)
    }
  }

  static getModificators(object: User | Waifu, modificatorType: modificatorType) {
    let modificatorArray: Array<Modificator> = Modificator.getAllRawModificators(object)

    const nakanoModificator = modificatorArray.find((mod) => mod.type == "nakano_bonus")
    const actionModificator = modificatorArray.find((mod) => mod.type == "reduce_action_time")
    if(actionModificator){
      modificatorArray.push(
        new Modificator('', 'reduce_explo_time', actionModificator.value),
        new Modificator('', 'reduce_analyse_time', actionModificator.value),
        new Modificator('', 'reduce_decrypt_time', actionModificator.value)
      )
    }
    if(nakanoModificator && object.objectType == "waifu" && object.whichNakano != 0){
      modificatorArray.push(
        new Modificator('', 'mult_agi', 1.4),
        new Modificator('', 'mult_XP', 1.4),
        new Modificator('', 'mult_int', 1.2),
        new Modificator('', 'mult_luck', 1.1)
      )
    }

    modificatorArray = modificatorArray.filter((modificator: Modificator) => modificator.type == modificatorType)

    let value
    if(MODIFICATOR_OPERATION[modificatorType] == "multiplicative")
      value = modificatorArray.reduce((accumulator, modificator: Modificator) => accumulator*modificator.value, 1)
    else
      value = modificatorArray.reduce((accumulator: number, modificator: Modificator) => accumulator+modificator.value, 0)

    return new Modificator('', modificatorType, value)
  }

  static hasModificators(object: User | Waifu, modificatorType: modificatorType): boolean {
    return Modificator.getAllRawModificators(object).some((modificator: Modificator) => modificator.type == modificatorType)
  }

  private static getAllRawModificators(object: User | Waifu){
    let modificatorArray: Array<Modificator> = []

    if(object.objectType == "waifu"){
      modificatorArray = Modificator.getUserModificators(object.owner!)
      for(const item of Object.values(object.equipedItems)){
        if(item) modificatorArray = modificatorArray.concat(item.modificators)
      }
      return modificatorArray.concat(object.modificators)
    }
    else{
      return Modificator.getUserModificators(object)
    }
  }


  private static getUserModificators(user: User){

    let itemModificators: Array<Modificator> = []

    user.equipedItems.forEach(item => {
      if(item) itemModificators = itemModificators.concat(item.modificators)
    })

    return itemModificators.concat(user.modificators)
  }
}
