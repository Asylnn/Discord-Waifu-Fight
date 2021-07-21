import user from '../class/user'
import waifu from '../class/waifu'
import item from '../class/item'
import { modificator } from '../class/types/modificator'
import {modificatorType} from '../class/types/modificator'

function getUserModificators(user: user): modificator[]{
  let itemModificators: Array<modificator> = []

  user.equipedItems.forEach((item: item) => {
    itemModificators = itemModificators.concat(item.modificators)
  })


  return itemModificators.concat(user.modificators)
}

export default function hasModificators(object: user | waifu, modificatorType: modificatorType): boolean{
  let modificatorArray: Array<modificator> = []

  if(object.objectType == "waifu"){
    modificatorArray = getUserModificators(object.owner)

    object.equipedItems.forEach(item => {
      modificatorArray = modificatorArray.concat(item.modificators)
    })

    modificatorArray = modificatorArray.concat(object.modificators)

  }
  else{
    modificatorArray = getUserModificators(object)
  }
  return modificatorArray.some((modificator: modificator) => modificator.type == modificatorType)
}
