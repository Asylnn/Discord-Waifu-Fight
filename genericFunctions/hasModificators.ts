import user from '../class/user'
import waifu from '../class/waifu'
import { modificator } from '../class/types/modificator'
import {modificatorType} from '../class/types/modificator'

function getUserModificators(user: user): modificator[]{
  let itemModificators: Array<modificator> = []

  user.equipedItems.forEach(item => {
    if(item) itemModificators = itemModificators.concat(item.modificators)
  })


  return itemModificators.concat(user.modificators)
}

export default function hasModificators(object: user | waifu, modificatorType: modificatorType): boolean{
  let modificatorArray: Array<modificator> = []

  if(object.objectType == "waifu"){
    if(object.owner){ //should always be defined normally
      modificatorArray = getUserModificators(object.owner)
    }
    for(const item of Object.values(object.equipedItems)){
      if(item) modificatorArray = modificatorArray.concat(item.modificators)
    }
    modificatorArray = modificatorArray.concat(object.modificators)
  }
  else{
    modificatorArray = getUserModificators(object)
  }
  return modificatorArray.some((modificator: modificator) => modificator.type == modificatorType)
}
