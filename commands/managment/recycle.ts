import {MAJ} from '../../class/types/itemType'
import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import testArg from '../util/testArguments'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import waifuClass from '../../class/waifu'

export default async function recycleItem(message: message, user: user, args: Array<string>){
  if(user.lvl < LEVEL_PERMISSIONS.recycle){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  const type = args[1]
  let reward = 0
  let waifu:waifu

  switch(type){
    case'userconsumable':
    case'waifuconsumable':
    case'useritem':
    case'waifuitem':
    case'materials':

      const itemIndex = Math.floor(parseInt(args[2]) - 1)
      if(!testArg(message, user, itemIndex, "validItem", type)) return true;
      const amount = Math.floor(parseInt(args[3]) || 1)
      const itemAndQty = user.items[MAJ[type]][itemIndex]
      const item = itemAndQty.item
      if(amount > itemAndQty.qty){message.reply(eval(getLoc)("not_enough_item")); return true;}
      reward = item.value*amount

      if(args.pop() != "c"){message.reply(eval(getLoc)("sell_item_confirm")); return true;}
      user._money += reward
      message.reply(eval(getLoc)("sell_item"))

      user.items.removeItem(item.id, amount)

      break;
    case 'waifu':
      const waifuIndex = Math.floor(parseInt(args[2]) - 1)

      if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
      waifu = user.waifus[waifuIndex]
      reward = waifu.value + Math.floor(waifu.value*waifu.lvl/50) + waifu.value*(waifu.stars - 1)/4
      if(args[3] != "c"){message.reply(eval(getLoc)("sell_waifu_confirm")); return true;}
      user._money += reward
      message.reply(eval(getLoc)("sell_waifu"))
      user.waifus[waifuIndex] = new waifuClass(user)
      break;
    case 'reservewaifu':
      const reserveWaifuIndex = Math.floor(parseInt(args[2]) - 1)

      if(!testArg(message, user, reserveWaifuIndex, "validReserveWaifu")){return true;}
      waifu = user.reserveWaifu[reserveWaifuIndex]
      reward = waifu.value + Math.floor(waifu.value*waifu.lvl/50) + waifu.value*(waifu.stars - 1)/4
      if(args[3] != "c"){message.reply(eval(getLoc)("sell_waifu_confirm")); return true;}
      user._money += reward
      message.reply(eval(getLoc)("sell_waifu"))
      user.reserveWaifu.splice(reserveWaifuIndex)
      break;
    default:
      message.reply(eval(getLoc)('invalid_recycle'))
      break;
  }
}
