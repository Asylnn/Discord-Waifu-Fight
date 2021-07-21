import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS} from '../../files/config.json'

export default async function buy(message: message, user: user, args: Array<string>){
  let price
  if(user.lvl < LEVEL_PERMISSIONS.buy){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  const index = Math.floor(parseInt(args[2]) - 1)
  switch (args[1]) {
    case "item":
      if(!itemShop[index]){message.reply(eval(getLoc)("buy_item_dont_exist")); return true;}
      price = itemShop[index].price
      if(price > user.money){message.reply(eval(getLoc)("buy_not_enough_money")); return true;}
      user.items.addItem(itemShop[index].item)
      user._money -= price
      message.reply(eval(getLoc)("buyed_item"))
      break;
    case "user":
      if(!userShop[index]){message.reply(eval(getLoc)("buy_inexistant_trade")); return true;}
      const trade = userShop[index]
      if(trade.price > user.money){message.reply(eval(getLoc)("buy_not_enough_money")); return true;}
      user._money -= trade.price
      if(trade.object.objectType == "waifu"){
        trade.object.owner = user
        user.reserveWaifu.push(trade.object)
      }
      else{
        user.items.addItem(trade.object)
      }
      users.get(trade.proposer.id).then(proposer => {
        proposer._money += trade.price
      })
      userShop.splice(index)
      message.reply(eval(getLoc)("buyed_user"))
      break;
    case "auction":
      const proposedPrice = index + 1
      let userMention
      price = globalAuction.price
      if(isNaN(proposedPrice)){message.reply(eval(getLoc)("price_nan")); return true;}
      if(proposedPrice > user._money){message.reply(eval(getLoc)("buy_not_enough_money")); return true;}
      if(proposedPrice < 1.1*price){message.reply(eval(getLoc)("auction_too_low_price")); return true;}
      if(globalAuction.higgestOffer.id != '-1'){
        users.get(globalAuction.higgestOffer.id).then(proposer => {
          userMention = proposer.beMentionned ? guild.members.cache.get(proposer.id) : proposer.osuName
          message.reply(eval(getLoc)("global_auction_lost")); userMention;
        })
      }
      globalAuction.higgestOffer = {username:user.osuName, id:user.id}
      globalAuction.price = proposedPrice

      message.reply(eval(getLoc)("auction_propose_success"))
      break;
    default:
      message.reply(eval(getLoc)("buy_missing_argument"))
      break;
  }
}
