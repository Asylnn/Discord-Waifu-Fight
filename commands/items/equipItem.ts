import message from '../../class/message'
import user from '../../class/user'
import testItem from '../util/testItem'
import Discord from 'discord.js'
import getParameterObject from '../util/getParameterObject'
import Modificator from '../../class/modificator'

commandManager.create({
  name:"equip",
  type:"CHAT_INPUT",
  description:"equip an item",
  options:[
    {
      name:"user",
      description:"equip an item to the user",
      required:false,
      type:"SUB_COMMAND",
      options:[{
        name:"slot",
        description:"the item slot (1, 2, 3...)",
        required:true,
        type:"INTEGER"
      },{
        name:"index",
        description:"Index",
        required:true,
        type:"INTEGER"
      }]
    },{
      name:"waifu",
      description:"equip an item to the waifu",
      required:false,
      type:"SUB_COMMAND",
      options:[{
          name:"index",
          description:"Index",
          required:true,
          type:"INTEGER"
        },{
            name:"w",
            description:"waifu slot -- Which waifu you want to equip an item with (no input will open select menu)",
            required:false,
            type:"INTEGER"
          }
      ]
    }
  ],
})

//type index waifu(op) slot



export default async function equipItem(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const {t:type, i:itemIndex} = message.isInteraction ? {t:interaction.options.getSubcommand(), i:interaction.options.getInteger("index")!-1} : {t:args[1], i:Math.floor(parseInt(args[2]) - 1)}

  if(type == "user" || type == "u"){
    const itemSlot = message.isInteraction ? interaction.options.getInteger("slot")! : Math.floor(parseInt(args[3]) - 1)
    if(isNaN(itemSlot)){message.addResponse(eval(getLoc)("no_item_slot")); return true;}
    if(itemSlot >= user.equipedItems.length || itemSlot < 0){message.addResponse(eval(getLoc)("invalid_item_slot")); return true;}
    const itemRow = testItem(message, user.items.userEquipment, itemIndex)
    if(!itemRow) return true;
    const item = itemRow.item
    const equipedItem = user.equipedItems[itemSlot]
    if(equipedItem)
      user.items.addItem(equipedItem)

    user.equipedItems[itemSlot] = item
    user.items.removeItem(item)
    message.addResponse(eval(getLoc)("equiping_item"))
  }
  else if(type == "waifu" || type == "w") {
    const waifu = await getParameterObject(message, user, args[3], interaction, "waifu")
    const itemRow = testItem(message, user.items.waifuEquipment, itemIndex)
    if(!itemRow || !waifu) return true;

    const item = itemRow.item
    const equipedItem = waifu.equipedItems[item.type]
    if(equipedItem) user.items.addItem(equipedItem)
    waifu.equipedItems[itemRow.item.type] = item
    user.items.removeItem(item)

    if(waifu.equipedItems.weapon?.set == waifu.equipedItems.outfit?.set && waifu.equipedItems.outfit?.set == waifu.equipedItems.accessory?.set && waifu.modificators.every(modificator => modificator.origin != "set")){
      if(waifu.equipedItems.weapon?.set == "mining") waifu.modificators.push(new Modificator('set', 'mining_capability', 1.2), new Modificator('set', 'reduce_mining_time', 1.2))
      if(waifu.equipedItems.weapon?.set == "princess") waifu.modificators.push(new Modificator('set', 'mult_psy', 1.2), new Modificator('set', 'mult_kaw', 1.2))
      if(waifu.equipedItems.weapon?.set == "gamer") waifu.modificators.push(new Modificator('set', 'mult_XP', 1.3), new Modificator('set', 'get_quest_reroll', 1.05))
    }
    else
      waifu.modificators = waifu.modificators.filter(modificator => modificator.origin != "set")

    message.addResponse(eval(getLoc)("waifu_equiping_item"))
  }
  else {
    message.addResponse(eval(getLoc)("invalid_type"))
    return true
  }

}
