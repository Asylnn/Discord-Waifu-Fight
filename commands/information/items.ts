import message from '../../class/message'
import user from '../../class/user'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import testItemType from '../util/testItemType'
import createSimpleEmbed from '../util/createSimpleEmbed'
import Discord from 'discord.js'
import WaifuEquipment from '../../class/item/waifuEquipment'

commandManager?.create({
  name:"rank",
  type:"CHAT_INPUT",
  description:"your rank and some other info",
  options:[{
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
  },{
    name:"index",
    description:"index of an item you want to see details",
    required:false,
    type:"NUMBER"
  }],
})

export default async function items(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const index = message.isInteraction ? interaction.options.getNumber("index") : Math.floor(+args[2])
  const itemType = testItemType(message, message.isInteraction ? interaction.options.getString("it")! : args[1])
  if(!itemType) return true

  const items = user.items[itemType]
  console.log(items)
  console.log(items.length)
  console.log(OBJECT_PER_PAGE)
  const numberOfPages = Math.ceil(items.length/OBJECT_PER_PAGE)
  console.log(numberOfPages)

  if(!index){
    message.createPageInteraction(numberOfPages, page => {
      let content = ""
      for (var i = (page - 1)*OBJECT_PER_PAGE; i < Math.min(page*OBJECT_PER_PAGE, items.length); i++){
        if(items[i].qty){
          const {item, qty} = items[i]
          content += `${i+1}: (x${qty}) ${eval(getLoc)(item.name) + "★".repeat(item.rarity)} | ${eval(getLoc)(item.description)} \r\n`
        }
        else {
          content += `${i+1}: ${eval(getLoc)(items[i].name) + "★".repeat(items[i].rarity)} | ${items[i].lvl} | ${eval(getLoc)(items[i].description)} \r\n`
        }

      }
      return createSimpleEmbed(eval(getLoc)('items_title'), content+" ")
    })
    return true
  }
  else{
    const itemRow = items[index - 1]
    let embed
    if(itemRow.qty){
      const {item, qty} = itemRow
      embed = createSimpleEmbed(eval(getLoc)(item.name), eval(getLoc)(item.description))

    }
    else {
      console.log("aaaa")
      const item = itemRow as WaifuEquipment
      embed = createSimpleEmbed(eval(getLoc)(item.name), eval(getLoc)(item.description))
      embed.addFields([
        {
          name:"level",
          value:`lvl: ${item.lvl}\r\n XP: ${item.xp}/${item.xpNeededToLevelUp}`
        },
        {
          name:"modificators",
          value:item.modificators.reduce((accumulator, modificator) => accumulator += modificator.toString(message), '')
        }])
    }
    message.embeds.push(embed)
  }
}
