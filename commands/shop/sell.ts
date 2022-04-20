import message from '../../class/message'
import user from '../../class/user'
import waifuClass from '../../class/waifu'
import {MAJ} from '../../class/types/itemType'
import {deepCopy} from '../../genericFunctions/copy'
import {LEVEL_PERMISSIONS, TEST_BUILD} from '../../files/config.json'
import testItem from '../util/testItem'
import testWaifu from '../util/testWaifu'
import testReserveWaifu from '../util/testReserveWaifu'
import Discord from 'discord.js'

const options: Discord.ApplicationCommandChoicesData[] = [
  {
    name:"slot",
    description:"slot of what you want to sell",
    required:true,
    type:"INTEGER"
  },{
    name:"price",
    description:"the price you want to set",
    required:true,
    type:"INTEGER"
  }
]

commandManager.create({
  name:"sell",
  type:"CHAT_INPUT",
  description:"It's selling time!",
  options:[{
      name:"waifu",
      description:"sell a waifu",
      required:false,
      type:"SUB_COMMAND",
      options:options
    },{
      name:"reservewaifu",
      description:"sell a reserve waifu",
      required:false,
      type:"SUB_COMMAND",
      options:options
    },{
      name:"item",
      description:"sell a item",
      required:false,
      type:"SUB_COMMAND",
      options:options.concat([{
        name:"it",
        description:"item type",
        required:true,
        type:"STRING",
        choices:[{name:"userconsumable", value:"userconsumable"},
          {name:"waifuconsumable", value:"waifuconsumable"},
          {name:"userequipment", value:"userequipment"},
          {name:"waifuequipment", value:"waifuequipment"},
          {name:"material", value:"material"},
        ],
      }])
    }
  ],
})

export default async function sell(message: message,user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  if(user.lvl < LEVEL_PERMISSIONS.buy && !TEST_BUILD){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  const {i:index, p:price, t:type} = !message.isInteraction ? {"i":parseInt(args[2]) - 1, "t":args[1], "p":Math.floor(parseInt(args[3]))} : {"i":interaction.options.getInteger('index')!,"t":interaction.options.getSubcommand(), "p": Math.floor(interaction.options.getInteger('price')!)}

  switch (type) {
    case 'userconsumable':
    case 'waifuconsumable':
    case 'userequipment':
    case 'waifuequipment':
    case 'material':
    case 'uc':
    case 'wc':
    case 'ue':
    case 'we':
    case 'm':

      let item = testItem(message, user.items[MAJ[type] as "material"], index)?.item
      if(item == null){return true;}
      item = deepCopy(item)

      if(isNaN(price)){message.addResponse(eval(getLoc)("price_nan")); return true;}

      user.items.removeItem(item)
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
