import user from '../class/user'
import waifu from '../class/waifu'
import equipmentUser from '../class/item/equipmentUser'
import { modificator } from '../class/types/modificator'
import {modificatorType} from '../class/types/modificator'
import hasModificators from './hasModificators'

import {MODIFICATOR_OPERATION} from '../files/config.json'

function getUserModificators(user: user){

  let itemModificators: Array<modificator> = []

  user.equipedItems.forEach(item => {
    if(item) itemModificators = itemModificators.concat(item.modificators)
  })

  return itemModificators.concat(user.modificators)
}

export default function(object: user | waifu, modificatorType: modificatorType): number{
  let mult: number, modificatorArray: Array<modificator> = [], user:user | undefined, waifu:waifu | undefined
  if(object.objectType == "waifu"){
    user = object.owner //Should always be defined normally
    waifu = object
    for(const item of Object.values(object.equipedItems)){
      if(item) modificatorArray = modificatorArray.concat(item.modificators)
    }

    modificatorArray = modificatorArray.concat(object.modificators)
  }
  else{
    user = object
    waifu = undefined
  }

  if(user){ //Should always be defined normally
    modificatorArray = modificatorArray.concat(getUserModificators(user))
    if(hasModificators(user, 'nakano_bonus')){
      if(waifu){
        if(waifu.whichNakano != 0) {
          modificatorArray.push({origin:'', type:'mult_EX', value:1.4}, {origin:'', type:'mult_XP', value:1.4}, {origin:'', type:'mult_int', value:1.2}, {origin:'', type:'mult_luck', value:5})
        }
      }
    }
  }


  const actionModificator = modificatorArray.find((mod) => mod.type == "reduce_action_time")
  if(actionModificator){
    modificatorArray.push({origin:'', type:'reduce_EX_time', value:actionModificator.value}, {origin:'', type:'reduce_analyse_time', value:actionModificator.value}, {origin:'', type:'reduce_decrypt_time', value:actionModificator.value})
  }

  modificatorArray = modificatorArray.filter((modificator: modificator) => modificator.type == modificatorType)

  if(MODIFICATOR_OPERATION[modificatorType] == "multiplicative"){
    mult = modificatorArray.reduce((accumulator: number, modificator: modificator) => accumulator*modificator.value, 1)
  }
  else{
    mult = modificatorArray.reduce((accumulator: number, modificator: modificator) => accumulator+modificator.value, 0)
  }
  return mult
}
