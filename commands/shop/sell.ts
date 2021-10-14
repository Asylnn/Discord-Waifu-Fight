import message from '../../class/message'
import user from '../../class/user'
import waifuClass from '../../class/waifu'
import {MAJ} from '../../class/types/itemType'
import {deepCopy} from '../../genericFunctions/copy'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import testItem from '../util/testItem'
import testWaifu from '../util/testWaifu'
import testReserveWaifu from '../util/testReserveWaifu'

export default async function sell(message: message,user: user, args: Array<string>){
  if(user.lvl < LEVEL_PERMISSIONS.buy){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  const index = Math.floor(parseInt(args[2]) - 1)
  const price = Math.floor(parseInt(args[3]))
  const type = args[1]
  switch (type) {
    case "consumableuser":
    case "consumablewaifu":
    case "equipmentuser":
    case "equipmentwaifu":
    case "material":

      let item = testItem(message, user.items[MAJ[type] as "material"], index)
      if(item == null){return true;}
      item = deepCopy(item)

      if(isNaN(price)){message.addResponse(eval(getLoc)("price_nan")); return true;}

      user.items.removeItem(item.id)
      userShop.push({proposer:{username: user.osuName, id:user.id}, price:price, object:item, amount:1})
      message.addResponse(eval(getLoc)("sell_success_item"))
      break;
    case "waifu":
      let waifu = testWaifu(message, user.waifus, index)
      if(!waifu){return true;}

      if(isNaN(price)){message.addResponse(eval(getLoc)("price_nan")); return true;}
      waifu.owner = undefined
      user.waifus[index] = new waifuClass(user)
      userShop.push({proposer:{username: user.osuName, id:user.id}, price:price, object:waifu, amount:1})
      message.addResponse(eval(getLoc)("sell_success_waifu"))
      break;
    case "reservewaifu":
      waifu = testReserveWaifu(message, user.waifus, index)
      if(!waifu){return true;}
      if(isNaN(price)){message.addResponse(eval(getLoc)("price_nan")); return true;}
      let reserveWaifu = user.reserveWaifu[index]
      user.reserveWaifu.splice(index)
      userShop.push({proposer:{username: user.osuName, id:user.id}, price:price, object:reserveWaifu, amount:1})
      message.addResponse(eval(getLoc)("sell_success_waifu"))
      break;
    default:
      message.addResponse(eval(getLoc)("sell_wrong_argument"))
      break;
  }
}
