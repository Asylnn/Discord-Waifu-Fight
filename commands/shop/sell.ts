import message from '../../class/message'
import user from '../../class/user'
import waifuClass from '../../class/waifu'
import testArg from '../util/testArguments'
import {MAJ} from '../../class/types/itemType'
import {deepCopy} from '../../genericFunctions/copy'
import {LEVEL_PERMISSIONS} from '../../files/config.json'

export default async function sell(message: message,user: user, args: Array<string>){
  if(user.lvl < LEVEL_PERMISSIONS.buy){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  const index = Math.floor(parseInt(args[2]) - 1)
  const price = Math.floor(parseInt(args[3]))
  const type = args[1]
  switch (type) {
    case "consumableuser":
    case "consumablewaifu":
    case "equipmentuser":
    case "equipmentwaifu":
    case "materials":

      if(!testArg(message, user, index, "validItem", type)) return true;
      if(isNaN(price)){message.reply(eval(getLoc)("price_nan")); return true;}
      let item = deepCopy(user.items[MAJ[type]][index]).item

      user.items.removeItem(item.id)
      userShop.push({proposer:{username: user.osuName, id:user.id}, price:price, object:item, amount:1})
      message.reply(eval(getLoc)("sell_success_item"))
      break;
    case "waifu":
      if(!testArg(message, user, index, "validWaifu")) return true;
      if(isNaN(price)){message.reply(eval(getLoc)("price_nan")); return true;}
      let waifu = user.waifus[index]
      waifu.owner = undefined as any
      user.waifus[index] = new waifuClass(user)
      userShop.push({proposer:{username: user.osuName, id:user.id}, price:price, object:waifu, amount:1})
      message.reply(eval(getLoc)("sell_success_waifu"))
      break;
    case "reservewaifu":
      if(!testArg(message, user, index, "validReserveWaifu")) return true;
      if(isNaN(price)){message.reply(eval(getLoc)("price_nan")); return true;}
      let reserveWaifu = user.reserveWaifu[index]
      user.reserveWaifu.splice(index)
      userShop.push({proposer:{username: user.osuName, id:user.id}, price:price, object:reserveWaifu, amount:1})
      message.reply(eval(getLoc)("sell_success_waifu"))
      break;
    default:
      message.reply(eval(getLoc)("sell_wrong_argument"))
      break;
  }
}
