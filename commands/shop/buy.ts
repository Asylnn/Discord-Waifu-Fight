import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS, TEST_BUILD} from '../../files/config.json'
import Discord from 'discord.js'

const options: Discord.ApplicationCommandChoicesData[] = [
  {
    name:"index",
    description:"Index",
    required:true,
    type:"INTEGER"
  }
]


commandManager.create({
  name:"buy",
  type:"CHAT_INPUT",
  description:"It's shopping time!",
  options:[
    {
      name:"item",
      description:"buy an item from the \"official shop\"",
      required:false,
      options:options,
      type:"SUB_COMMAND"
    },{
      name:"user",
      description:"buy an item from an user",
      required:false,
      type:"SUB_COMMAND",
      options:options

    },{
      name:"auction",
      description:"propose a price for the auction",
      required:false,
      type:"SUB_COMMAND",
      options:options
    }
  ],
})

export default async function buy(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  let price
  if(user.lvl < LEVEL_PERMISSIONS.buy && !TEST_BUILD){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  const {i:index, t:type} = !message.isInteraction ? {"i":parseInt(args[2]) - 1, "t":args[1]} : {"i":interaction.options.getInteger('index')!,"t":interaction.options.getSubcommand()}

  switch (type) {
    case "item":
      if(!itemShop[index]){message.addResponse(eval(getLoc)("buy_item_dont_exist")); return true;}
      price = itemShop[index].price
      if(price > user.money){message.addResponse(eval(getLoc)("buy_not_enough_money")); return true;}
      user.items.addItem(itemShop[index].item)
      user._money -= price
      message.addResponse(eval(getLoc)("buyed_item"))
      break;
    case "user":
      if(!userShop[index]){message.addResponse(eval(getLoc)("buy_inexistant_trade")); return true;}
      const trade = userShop[index]
      if(trade.price > user.money){message.addResponse(eval(getLoc)("buy_not_enough_money")); return true;}
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
      message.addResponse(eval(getLoc)("buyed_user"))
      break;
    case "auction":
      const proposedPrice = index + 1
      let userMention
      price = globalAuction.price
      if(isNaN(proposedPrice)){message.addResponse(eval(getLoc)("price_nan")); return true;}
      if(proposedPrice > user._money){message.addResponse(eval(getLoc)("buy_not_enough_money")); return true;}
      if(proposedPrice < 1.1*price){message.addResponse(eval(getLoc)("auction_too_low_price")); return true;}
      if(globalAuction.higgestOffer.id != '-1'){
        users.get(globalAuction.higgestOffer.id).then(proposer => {
          userMention = proposer.beMentionned ? guild.members.cache.get(proposer.id) : proposer.osuName
          message.addResponse(eval(getLoc)("global_auction_lost")); userMention;
        })
      }
      globalAuction.higgestOffer = {username:user.osuName, id:user.id}
      globalAuction.price = proposedPrice

      message.addResponse(eval(getLoc)("auction_propose_success"))
      break;
    default:
      message.addResponse(eval(getLoc)("buy_missing_argument"))
      break;
  }
}
