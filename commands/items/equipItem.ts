import message from '../../class/message'
import user from '../../class/user'
import testItem from '../util/testItem'
import Discord from 'discord.js'
import item from '../../class/item/item'
import getParameterObject from '../util/getParameterObject'


commandManager.create({
  name:"equip",
  type:"CHAT_INPUT",
  description:"equip an item",
  options:[
    {
      name:"user",
      description:"equip an item to the user",
      required:true,
      type:"SUB_COMMAND",
      options:[{
        name:"slot",
        description:"the item slot (1, 2, 3...)",
        required:true,
        type:"INTEGER"
      }]
    },{
      name:"waifu",
      description:"equip an item to the waifu",
      required:true,
      type:"SUB_COMMAND",
      options:[
        {
          name:"w",
          description:"waifu slot -- Which waifu will analyse an artifact (no input will open select menu) -- help slot",
          required:false,
          type:"INTEGER"
        },{
          name:"slot",
          description:"item slot",
          required:true,
          type:"STRING"
        }
      ]
    },{
      name:"index",
      description:"item's index",
      required:true,
      type:"INTEGER"
    }
  ],
})

//type index waifu(op) slot

export default async function equipItem(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const {t:type, i:itemIndex} = message.isInteraction ? {t:interaction.options.getSubcommand(), i:interaction.options.getInteger("index")!} : {t:args[1], i:Math.floor(parseInt(args[2]) - 1)}
  let item:item


  if(type == "user"){
    const itemSlot = message.isInteraction ? interaction.options.getInteger("slot")! : Math.floor(parseInt(args[3]) - 1)
    if(isNaN(itemSlot)){message.addResponse(eval(getLoc)("no_item_slot")); return true;}
    if(itemSlot >= user.equipedItems.length || itemSlot < 0){message.addResponse(eval(getLoc)("invalid_item_slot")); return true;}
    const item = testItem(message, user.items.equipmentUser, itemIndex)
    if(!item) return true;
    const equipedItem = user.equipedItems[itemSlot]
    if(equipedItem){
      user.items.addItem(equipedItem)
    }
    user.equipedItems[itemSlot] = item
    message.addResponse(eval(getLoc)("equiping_item"))
  }
  else{
    const waifu = await getParameterObject(message, user, args[3], interaction, "waifu")
    const item = testItem(message, user.items.equipmentWaifu, itemIndex)
    if(!item || !waifu){return true;}
    const itemSlot = message.isInteraction ? interaction.options.getString("slot")! : args[4]

    if(!itemSlot){message.addResponse(eval(getLoc)("no_item_slot")); return true;}
    if(!["weapon", "outfit", "accessory"].includes(itemSlot)){message.addResponse(eval(getLoc)("invalid_item_slot")); return true;}

    /*const equipedItem = user.equipedItems[itemSlot]
    user.items.addItem(equipedItem)*/
    waifu.equipedItems[itemSlot as "weapon"] = item
    message.addResponse(eval(getLoc)("waifu_equiping_item"))
  }

  user.items.removeItem(item!.id)
}
