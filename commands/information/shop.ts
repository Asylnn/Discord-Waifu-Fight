import message from '../../class/message'
import user from '../../class/user'
import seeUserShop from './seeUserShop'
import {LEVEL_PERMISSIONS} from '../../files/config.json'

export default async function shop(message: message, user: user, args: Array<string>){
  if(user.lvl < LEVEL_PERMISSIONS.shop){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  let content = ""
  switch (args[1]) {
    case "item":
      itemShop.forEach((itemInfo,i) =>{
        content += `${i}: ${eval(getLoc)(itemInfo.item.name)} | ${eval(getLoc)(itemInfo.item.description)} | Prix: ${itemInfo.price}¥ \n`
      });
      message.reply(content)
      break;
    case "user":
      seeUserShop(message, 1, user.id, true)
      break;
    case "auction":
      message.reply(`Item : ${eval(getLoc)(globalAuction.item.name)} ${globalAuction.item.rarity != 0 ? "(★ = max tier)" : ""} \n${eval(getLoc)("auction_biggest_offer")}`)
      break;
    default:
      message.reply(eval(getLoc)("shop_missing_argument"))
  }
  return true
}
