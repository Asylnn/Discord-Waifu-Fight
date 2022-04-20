import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import testWaifu from '../util/testWaifu'
import testReserveWaifu from '../util/testReserveWaifu'
import testItem from '../util/testItem'
import testUserDeal from './testUserDeal'
import dealObjectType from '../../class/types/dealObjectType'
import {MAJ} from '../../class/types/itemType'


export default async function add(message: message, user: user, args:Array<string>): Promise<any>{
  if(!testUserDeal(user, message)) return true;
  const index = Math.floor(parseInt(args[2]) - 1)
  let waifu: waifu | null
  let deal = await deals.get(user.currentDealId)
  let complement: number | string, type = args[1], name = " ", success = false
  switch(type){
    case "waifu":
      waifu = testWaifu(message, user.waifus, index)
      if(!waifu){return true;}

      if(waifu.isTradable){
        deal.valid = false
        const template = waifus.get(waifu.id)
        if(!template) return true;
        name = template.name
        complement = "★".repeat(waifu.stars) + " LVL " + waifu.lvl
        success = true
        message.addResponse(eval(getLoc)("deal_add_waifu"))
      }
      else{
        message.addResponse(eval(getLoc)("deal_add_waifu_not_tradable"))
      }
      break;
    case "reservewaifu":
      waifu = testReserveWaifu(message, user.waifus, index)
      if(!waifu){return true;}
      if(waifu.isTradable){
        deal.valid = false
        const template = waifus.get(waifu.id)
        name = template.name
        complement = "★".repeat(waifu.stars) + " LVL " + waifu.lvl
        message.addResponse(eval(getLoc)("deal_add_waifu"))
        success = true
      }
      else{
        message.addResponse(eval(getLoc)("deal_add_waifu_not_tradable"))
      }
      break;
    case 'userconsumable':
    case 'waifuconsumable':
    case 'userequipment':
    case 'waifuequipment':
    case 'material':
      const items = user.items[MAJ[type] as 'material']
      const item = testItem(message, items, index)?.item
      if(!item){return true;}
      complement = Math.floor(parseInt(args[3])) || 1
      if(complement > items[index].qty){message.addResponse(eval(getLoc)("not_enough_item")); return true;}

      deal.valid = false
      name = item.name
      message.addResponse(eval(getLoc)("deal_add_item"))
      success = true

      break;
    case "yens":
      if(isNaN(parseInt(args[2]))){message.addResponse(eval(getLoc)("deal_invalid_coins_invalid")); return true;}
      if(deal[deal.turn].find(dealObject => dealObject.type == "yens") != undefined){message.addResponse(eval(getLoc)("deal_invalid_already_have_yens")); return true;}
      if(parseInt(args[2]) > user.money || parseInt(args[2])<= 0){message.addResponse(eval(getLoc)("deal_invalid_not_enougth_coins")); return true;}
      deal.valid = false
      complement = args[2]
      success = true
      message.addResponse(eval(getLoc)("deal_add_coins"))
      break;
    default:
      message.addResponse(eval(getLoc)("deal_add_invalid"))
      break;
  }
  if(success){deal[deal.turn].push({reference: parseInt(args[2]), type: type as dealObjectType, name:name, complement:complement!})}
}
