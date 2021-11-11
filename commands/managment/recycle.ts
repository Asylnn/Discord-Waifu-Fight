import {MAJ} from '../../class/types/itemType'
import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import testWaifu from '../util/testWaifu'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import waifuClass from '../../class/waifu'
import testItem from '../util/testItem'
import testReserveWaifu from '../util/testReserveWaifu'
import Discord from 'discord.js'
import checkClicker from '../util/checkClicker'
import {IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'

const options: Discord.ApplicationCommandChoicesData[] = [
  {
    name:"index",
    description:"Index",
    required:true,
    type:"INTEGER"
  }
]

commandManager.create({
  name:"recycle",
  type:"CHAT_INPUT",
  description:"sometimes things has to be done to earn money...",
  options:[
    {
      name:"waifu",
      description:"recycle a waifu",
      required:false,
      type:"SUB_COMMAND",
      options:options
    },{
      name:"reservewaifu",
      description:"recycle a reserve waifu",
      required:false,
      type:"SUB_COMMAND",
      options:options
    },{
      name:"item",
      description:"recycle a item",
      required:false,
      type:"SUB_COMMAND",
      options:options.concat([{
        name:"it",
        description:"item type -- ADD DESCRIPTION",
        required:true,
        type:"STRING",
        choices:[{name:"consumableuser", value:"consumableuser"},
          {name:"consumablewaifu", value:"consumablewaifu"},
          {name:"equipmentuser", value:"equipmentuser"},
          {name:"equipmentwaifu", value:"equipmentwaifu"},
          {name:"material", value:"material"},
        ],
      }])
    }
  ],
})

export default async function recycleItem(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  if(user.lvl < LEVEL_PERMISSIONS.recycle){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}
  let reward = 0
  let waifu:waifu | null

  let {i:index, t:type} = !message.isInteraction ? {"i":parseInt(args[2]) - 1, "t":args[1]} : {"i":interaction.options.getInteger('index')!, "t":interaction.options.getSubcommand()}
  if(type == "item") type = interaction.options.getString("it")!

  message.addButton("confirm", "confirm", "PRIMARY")

  const collectorOn = async (text:string, instructions:Function) => {
    const collector = (await message.reply(text)).createMessageComponentCollector({componentType:'BUTTON', idle:IDLE_TIME_OF_INTERACTIONS})
    collector.on('collect', (interaction: Discord.ButtonInteraction) => {
      if(checkClicker(interaction, user.id)) return true;
      instructions()
    })
  }

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

      collectorOn(eval(getLoc)("sell_item_confirm"), () => {
        user._money += reward
        message.reply(eval(getLoc)("sell_item"))
        user.items.removeItem(item.id, amount)
      })




      break;
    case 'waifu':
      waifu = testWaifu(message, user.waifus, index)
      if(!waifu){return true;}

      reward = waifu.value + Math.floor(waifu.value*waifu.lvl/50) + waifu.value*(waifu.stars - 1)/4
      collectorOn(eval(getLoc)("sell_waifu_confirm"), () => {
        user._money += reward
        message.reply(eval(getLoc)("sell_waifu"))
        user.waifus[index] = new waifuClass(user)
      })
      break;

    case 'reservewaifu':
      waifu = testReserveWaifu(message, user.waifus, index)
      if(!waifu){return true;}

      reward = waifu.value + Math.floor(waifu.value*waifu.lvl/50) + waifu.value*(waifu.stars - 1)/4
      collectorOn(eval(getLoc)("sell_waifu_confirm"), () => {
        user._money += reward
        message.reply(eval(getLoc)("sell_waifu"))
        user.reserveWaifu.splice(index)
      })
      break;
    default:
      message.addResponse(eval(getLoc)('invalid_recycle'))
      break;

  }
}
