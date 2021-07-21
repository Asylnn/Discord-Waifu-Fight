import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import testUserDeal from './testUserDeal'
import dealObjectType from '../../class/types/dealObjectType'
import {MAJ} from '../../class/types/itemType'


export default async function add(message: message, user: user, args:Array<string>): Promise<any>{
  if(!testUserDeal(user, message)) return true;
  let deal = await deals.get(user.currentDealId)
  let complement = "", type = args[1], name = " ", success = false
  switch(type){
    case "waifu":
      const waifuIndex = Math.floor(parseInt(args[2]) - 1)
      if(testArg(message, user, waifuIndex, "validWaifu")){
        let waifu = user.waifus[waifuIndex]
        if(waifu.isTradable){
          deal.valid = false
          const template = waifus.get(waifu.id)
          if(!template) return true;
          name = template.name
          complement = "★".repeat(waifu.stars) + " LVL " + waifu.lvl
          success = true
          message.reply(eval(getLoc)("deal_add_waifu"))
        }
        else{
          message.reply(eval(getLoc)("deal_add_waifu_not_tradable"))
        }
      }
      break;
    case "reservewaifu":

      const reserveWaifuIndex = Math.floor(parseInt(args[2]) - 1)
      if(testArg(message, user, reserveWaifuIndex, "validReserveWaifu")){
        let waifu = user.reserveWaifu[reserveWaifuIndex]
        if(waifu.isTradable){
          deal.valid = false
          let waifu = user.reserveWaifu[reserveWaifuIndex]
          const template = waifus.get(waifu.id)
          if(!template) return true;
          name = template.name
          complement = "★".repeat(waifu.stars) + " LVL " + waifu.lvl
          message.reply(eval(getLoc)("deal_add_waifu"))
          success = true
        }
        else{
          message.reply(eval(getLoc)("deal_add_waifu_not_tradable"))
        }
      }
      break;
    case "userconsumable":
    case "waifuconsumable":
    case "useritem":
    case "waifuitem":
    case "materials":
      const itemIndex = Math.floor(parseInt(args[2]) - 1)
      if(testArg(message, user, itemIndex, "validItem")){

        const complement = Math.floor(parseInt(args[3])) || 1
        if(complement > user.items[MAJ[type]][itemIndex].qty){message.reply(eval(getLoc)("not_enough_item")); return true;}

        deal.valid = false
        name = user.items[MAJ[type]][itemIndex].item.name
        message.reply(eval(getLoc)("deal_add_item"))
        success = true
      }
      break;
    case "yens":
      if(isNaN(parseInt(args[2]))){message.reply(eval(getLoc)("deal_invalid_coins_invalid")); return true;}
      if(deal[deal.turn].find(dealObject => dealObject.type == "yens") != undefined){message.reply(eval(getLoc)("deal_invalid_already_have_yens")); return true;}
      if(parseInt(args[2]) > user.money || parseInt(args[2])<= 0){message.reply(eval(getLoc)("deal_invalid_not_enougth_coins")); return true;}
      deal.valid = false
      complement = args[2]
      success = true
      message.reply(eval(getLoc)("deal_add_coins"))
      break;
    default:
      message.reply(eval(getLoc)("deal_add_invalid"))
      break;
  }
  if(success){deal[deal.turn].push({reference: parseInt(args[2]), type: type as dealObjectType, name:name, complement:complement})}
}
