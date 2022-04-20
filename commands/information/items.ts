import message from '../../class/message'
import user from '../../class/user'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import testItemType from '../util/testItemType'
import testItem from '../util/testItem'
import createSimpleEmbed from '../util/createSimpleEmbed'
import Discord from 'discord.js'
import WaifuEquipment from '../../class/item/waifuEquipment'

commandManager?.create({
  name:"items",
  type:"CHAT_INPUT",
  description:"see all your precious items",
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
    name:"slot",
    description:"slot of an item you want to see details",
    required:false,
    type:"NUMBER"
  }],
})

export default async function items(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const index = message.isInteraction ? interaction.options.getNumber("slot") : Math.floor(+args[2] - 1)
  const itemType = testItemType(message, message.isInteraction ? interaction.options.getString("it")! : args[1])
  if(!itemType) return true

  const items = user.items[itemType]
  const numberOfPages = Math.ceil(items.length/OBJECT_PER_PAGE)

  if(!index && index != 0){ //If we didn't specified an item to see
    message.createPageInteraction(numberOfPages, page => {
      let content = ""
      for (var i = (page - 1)*OBJECT_PER_PAGE; i < Math.min(page*OBJECT_PER_PAGE, items.length); i++){
        const {item, qty} = items[i]

        if(item?.objectType != "waifuEquipment"){ //<---------------- CEST PAS JOLIE
          var complement = ""
          if(item.id == "78" || item.id == "79") complement = waifus.get(item.complementaryInformation).name
          content += `${i+1}: (x${qty}) ${eval(getLoc)(item.name) + "★".repeat(item.rarity)} | ${eval(getLoc)(item.description)} \r\n`; complement;
        }
        else {
          content += `${i+1}: ${eval(getLoc)(item.name) + "★".repeat(item.rarity)} | ${item.lvl} | ${eval(getLoc)(item.description)} \r\n`
        }
      }
      return createSimpleEmbed(eval(getLoc)('items_title'), content+" ")
    })
    return true
  }
  else{
    const itemRow = testItem(message, items as {item:WaifuEquipment, qty:number}[] /*"as" just for ts*/, index)
    if(!itemRow) return true
    const {item} = itemRow
    let embed
    if(item.objectType != "waifuEquipment"){
      embed = createSimpleEmbed(eval(getLoc)(item.name), eval(getLoc)(item.description))
    }
    else {
      embed = item.showStats(message)
    }
    message.embeds.push(embed)
  }
}
