import message from '../../class/message'
import consumableUser from '../../class/item/consumableUser'
import consumableWaifu from '../../class/item/consumableWaifu'
import equipmentUser from '../../class/item/equipmentUser'
import equipmentWaifu from '../../class/item/equipmentWaifu'
import material from '../../class/item/materials'

export default function testArg<type extends consumableUser | consumableWaifu | equipmentUser | equipmentWaifu | material>(message: message, items: Array<{item:type, qty:number}>, index: number){

  switch(true) {
    case isNaN(index):
      message.addResponse(eval(getLoc)("item_invalid_no_arg"))
      break;
    case 0 > index:
    case index >= items.length:
      message.addResponse(eval(getLoc)("item_invalid"))
      return null
  }
  var u = items[index].item as type
  return u
}
