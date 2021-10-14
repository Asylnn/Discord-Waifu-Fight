import {MAJ} from '../../class/types/itemType'
import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import testWaifu from '../util/testWaifu'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import waifuClass from '../../class/waifu'
import testItem from '../util/testItem'
import testReserveWaifu from '../util/testReserveWaifu'

export default async function recycleItem(message: message, user: user, args: Array<string>){
  if(user.lvl < LEVEL_PERMISSIONS.recycle){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}
  const index = Math.floor(parseInt(args[2]) - 1)

  const type = args[1]
  let reward = 0
  let waifu:waifu | null

  switch(type){
    case 'consumableuser':
    case 'consumablewaifu':
    case 'equipmentuser':
    case 'equipmentwaifu':
    case 'material':

      const amount = Math.floor(parseInt(args[3]) || 1)

      const items = user.items[MAJ[type] as 'material']
      const item = testItem(message, items, index)
      if(item == null){return true;}

      if(amount > items[index].qty){message.addResponse(eval(getLoc)("not_enough_item")); return true;}
      reward = item.value*amount

      if(args.pop() != "c"){message.addResponse(eval(getLoc)("sell_item_confirm")); return true;}
      user._money += reward
      message.addResponse(eval(getLoc)("sell_item"))

      user.items.removeItem(item.id, amount)

      break;
    case 'waifu':

      waifu = testWaifu(message, user.waifus, index)
      if(!waifu){return true;}

      reward = waifu.value + Math.floor(waifu.value*waifu.lvl/50) + waifu.value*(waifu.stars - 1)/4
      if(args[3] != "c"){message.addResponse(eval(getLoc)("sell_waifu_confirm")); return true;}
      user._money += reward
      message.addResponse(eval(getLoc)("sell_waifu"))
      user.waifus[index] = new waifuClass(user)
      break;
    case 'reservewaifu':
      waifu = testReserveWaifu(message, user.waifus, index)
      if(!waifu){return true;}

      reward = waifu.value + Math.floor(waifu.value*waifu.lvl/50) + waifu.value*(waifu.stars - 1)/4
      if(args[3] != "c"){message.addResponse(eval(getLoc)("sell_waifu_confirm")); return true;}
      user._money += reward
      message.addResponse(eval(getLoc)("sell_waifu"))
      user.reserveWaifu.splice(index)
      break;
    default:
      message.addResponse(eval(getLoc)('invalid_recycle'))
      break;
  }
}
