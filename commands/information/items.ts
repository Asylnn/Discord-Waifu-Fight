import message from '../../class/message'
import user from '../../class/user'
import {MAJ} from '../../class/types/itemType'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import testItemType from '../util/testItemType'
import createSimpleEmbed from '../util/createSimpleEmbed'
import Discord from 'discord.js'

commandManager?.create({
  name:"rank",
  type:"CHAT_INPUT",
  description:"your rank and some other info",
  options:[{
    name:"it",
    description:"item type",
    required:true,
    type:"STRING",
    choices:[{name:"consumableuser", value:"consumableuser"},
      {name:"consumablewaifu", value:"consumablewaifu"},
      {name:"equipmentuser", value:"equipmentuser"},
      {name:"equipmentwaifu", value:"equipmentwaifu"},
      {name:"material", value:"material"},
    ],
  }],
})

export default async function items(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const itemType = message.isInteraction ? interaction.options.getString("it")! : args[1]
  if(!testItemType(message, itemType)) return true
  const items = user.items[MAJ[itemType as 'material']]
  const numberOfPages = Math.ceil(items.length/OBJECT_PER_PAGE)

  message.createPageInteraction(numberOfPages, page => {
    let content = ""
    for (var i = (page - 1)*OBJECT_PER_PAGE; i < Math.min(page*OBJECT_PER_PAGE, items.length); i++){
      const {item, qty} = {...items[i]}
      content += `${i+1}: (x${qty}) ${eval(getLoc)(item.name) + "★".repeat(item.rarity)} | ${eval(getLoc)(item.description)} \r\n`
    }
    return createSimpleEmbed(eval(getLoc)('items_title'), content+" ")
  })
  return true
}
