import message from '../../class/message'
import user from '../../class/user'
import testItem from '../util/testItem'


export default async function equipUserItem(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)
  const itemSlot = Math.floor(parseInt(args[2]) - 1)

  const item = testItem(message, user.items.equipmentUser, itemIndex)
  if(item == null){return true;}
  if(isNaN(itemSlot)){message.addResponse(eval(getLoc)("no_item_slot")); return true;}
  if(itemSlot >= user.equipedItems.length || itemSlot < 0){message.addResponse(eval(getLoc)("invalid_item_slot")); return true;}

  if(user.items.equipmentUser[itemIndex] == undefined){return true;}

  //const item = user.items.equipmentUser[itemIndex].item



  const equipedItem = user.equipedItems[itemSlot]
  if(equipedItem != null){
    user.items.addItem(equipedItem)
  }

  user.equipedItems[itemSlot] = item
  user.items.removeItem(item.id)
  message.addResponse(eval(getLoc)("equiping_item"))
}
