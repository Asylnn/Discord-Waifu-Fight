import message from '../../class/message'
import user from '../../class/user'
import testItem from '../util/testItem'
import testWaifu from '../util/testWaifu'


export default async function equipWaifuItem(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)
  const waifuIndex = Math.floor(parseInt(args[2]) - 1)
  const itemSlot = args[3]
  /* GO LATER
  */
  const item = testItem(message, user.items.equipmentWaifu, itemIndex)
  if(!item){return true;}
  const waifu = testWaifu(message, user.waifus, waifuIndex)
  if(!waifu){return true;}

  if(!itemSlot){message.addResponse(eval(getLoc)("no_item_slot")); return true;}
  if(!["weapon", "outfit", "accessory"].includes(itemSlot)){  message.addResponse(eval(getLoc)("invalid_item_slot")); return true;}

  /*const equipedItem = user.equipedItems[itemSlot]
  user.items.addItem(equipedItem)*/
  waifu.equipedItems[itemSlot as "weapon"] = item
  user.items.removeItem(item.id)
  message.addResponse(eval(getLoc)("waifu_equiping_item"))
}
