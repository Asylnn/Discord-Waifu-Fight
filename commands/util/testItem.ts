import message from '../../class/message'
import consumableUser from '../../class/item/userConsumable'
import consumableWaifu from '../../class/item/waifuConsumable'
import equipmentUser from '../../class/item/userEquipment'
import equipmentWaifu from '../../class/item/waifuEquipment'
import material from '../../class/item/material'

export default function testArg<type extends consumableUser | consumableWaifu | equipmentUser | equipmentWaifu | material>(message: message, items: Array<{item:type, qty:number}> | Array<equipmentWaifu>, index: number){

  switch(true) {
    case isNaN(index):
      message.addResponse(eval(getLoc)("item_invalid_no_arg"))
      break;
    case 0 > index:
    case index >= items.length:
      message.addResponse(eval(getLoc)("item_invalid"))
      return null
  }
  if(items[index].hasOwnProperty('objectType')) return items[index] as equipmentWaifu
  else return (items[index] as {item:type, qty:number}).item as type
}
