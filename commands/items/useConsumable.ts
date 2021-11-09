import message from '../../class/message'
import user from '../../class/user'
import effect from '../../class/types/effect'
import {modificator} from '../../class/types/modificator'
import testItem from '../util/testItem'
import waifuClass from '../../class/waifu'
import consumableUser from '../../class/item/consumableUser'
import consumableWaifu from '../../class/item/consumableWaifu'
import getParameterObject from '../util/getParameterObject'
import Discord from 'discord.js'

commandManager.create({
  name:"use",
  type:"CHAT_INPUT",
  description:"c o n s u m e",
  options:[
    {
      name:"user",
      description:"consume an user consumable",
      required:true,
      type:"SUB_COMMAND",
    },{
      name:"waifu",
      description:"consume an waifu consumable",
      required:true,
      type:"SUB_COMMAND",
      options:[
        {
          name:"w",
          description:"waifu slot -- Which waifu will analyse an artifact (no input will open select menu) -- help slot",
          required:false,
          type:"INTEGER"
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

export default async function useConsumable(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const {t:type, i:itemIndex} = message.isInteraction ? {t:interaction.options.getSubcommand(), i:interaction.options.getInteger("index")!} : {t:args[1], i:Math.floor(parseInt(args[2]) - 1)}

  let waifu:waifuClass | null, item: consumableUser | consumableWaifu | null

  if(type == "user") item = testItem(message, user.items.consumableUser, itemIndex)
  else {
    item = testItem(message, user.items.consumableWaifu, itemIndex)
    waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  }
  if(!item) return true

  const effects = item.effects // Collection des effets de l'item usedItem
  effects.forEach(async (effect /*OR valueAndType*/: effect) => {
    applyEffect(message, effect, user, waifu as waifuClass, item!.id)
  })
}


function applyEffect(message:message, effect:effect, user:user, waifu:waifuClass, itemId:string){
  const {value, effectType} = {...effect}
  let itemUsed = false
  switch(effectType){

    case 'extract_XP':

      const totalXP = Math.floor(waifu.totalXP*value[0])
      user.waifuXP += totalXP

      if(value[1]){
        user.waifus.splice(waifu.owner!.waifus.findIndex((userWaifu) => userWaifu?.id == waifu.id))
        message.addResponse(eval(getLoc)("extract_xp_die"))
      }
      else {
        waifu.lvl = 1
        waifu.xp = 0
        waifu.b_luck = waifu.o_luck
        waifu.b_agi = waifu.o_agi
        waifu.b_int = waifu.o_int
        waifu.b_dext = waifu.o_int
        waifu.b_kaw = waifu.o_int
        waifu.b_stg = waifu.o_stg

        waifu.stars = 1
      }
      message.addResponse(eval(getLoc)("extract_xp_success"))
      itemUsed = true

      break;
    case 'add_modificator':
      for(const modificator of value as Array<modificator>){

        if(!waifu.modificators.some((waifuModificators: modificator) => waifuModificators.origin == modificator.origin)){
          waifu.modificators.push(modificator)

          message.addResponse(eval(getLoc)("use_modificator"))
          itemUsed = true
        }
        else {
          message.addResponse(eval(getLoc)("already_used_item_modificator"))
        }
      }
      break;
    case 'earn_XP':
      if(value[1]){
        waifu.giveXP(value[0], message)
      }
      else {
        waifu.giveXP(value[0], message, false)
      }
      itemUsed = true
      break;
    case 'level_up':
      if(waifu.lvl < waifu.maxLvl){
        waifu.giveXP(waifu.xplvlup, message, false)
        itemUsed = true
      }
      else{
        message.addResponse(eval(getLoc)("lvl_upper_lvl_max"))
      }
      break;
    case 'set_multxp':
      user.multXP = value
      message.addResponse("items.ts l69 <TEMP>| xp multiplicator successfly set")
      break;
    case 'earn_money':
      user.money = value
      message.addResponse(eval(getLoc)("earn_money"))
      itemUsed = true
      break;
    case 'give_item':
      user.items.addItem(value)
      message.addResponse(eval(getLoc)("got_item"))
      itemUsed = true
      break;
    case 'give_waifu':
      user.reserveWaifu.push(new waifuClass(user, value))
      message.addResponse(eval(getLoc)("got_waifu"))
      itemUsed = true
      break;
    case 'summon_nagisa':
      let dangoNumber = user.items.consumableWaifu.find((itemAndQty:  any) => itemAndQty.item.id == itemId)

      if(!dangoNumber) return false;
      if(dangoNumber.qty >= 7){
        user.items.removeItem(itemId, 7)
        user.reserveWaifu.push(new waifuClass(user, waifus.get("34"))) //Nagisa Furukawa
        message.addResponse(eval(getLoc)("summoned_nagisa"))
        itemUsed = true
      }
      else{
        message.addResponse(eval(getLoc)("not_enough_dango"))
      }
      break;
    case 'earn_waifuXP':
      message.addResponse(eval(getLoc)("got_user_waifu_xp"))
      user.waifuXP += value
      itemUsed = true
      break;
    case 'quest_reroll':
      user.quests.refreshQuests()
      message.addResponse(eval(getLoc)("quest_reroll"))
      itemUsed = true
      break;
  }
  if(itemUsed) user.items.removeItem(itemId)
}
