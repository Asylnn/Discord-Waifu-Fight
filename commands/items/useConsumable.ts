import message from '../../class/message'
import user from '../../class/user'
import effect from '../../class/types/effect'
import modificator from '../../class/modificator'
import testItem from '../util/testItem'
import waifuClass from '../../class/waifu'
import consumableUser from '../../class/item/userConsumable'
import consumableWaifu from '../../class/item/waifuConsumable'
import getParameterObject from '../util/getParameterObject'
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
  name:"use",
  type:"CHAT_INPUT",
  description:"c o n s u m e",
  options:[
    {
      name:"user",
      description:"consume an user consumable",
      required:false,
      type:"SUB_COMMAND",
      options:options
    },{
      name:"waifu",
      description:"consume an waifu consumable",
      required:false,
      type:"SUB_COMMAND",
      options:options.concat([
        {
          name:"w",
          description:"waifu slot -- Which waifu will consume the item (no input will open select menu)",
          required:false,
          type:"INTEGER"
        }
      ])
    }
  ],
})

export default async function useConsumable(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const {t:type, i:itemIndex} = message.isInteraction ? {t:interaction.options.getSubcommand(), i:interaction.options.getInteger("index")!} : {t:args[1], i:Math.floor(parseInt(args[2]) - 1)}

  let waifu:waifuClass | null, item: consumableUser | consumableWaifu | undefined

  if(type == "user" || type == "u") item = testItem(message, user.items.userConsumable, itemIndex)?.item
  else if(type == "waifu" || type == "w") {
    item = testItem(message, user.items.waifuConsumable, itemIndex)?.item
    if(!item) return true;
    waifu = await getParameterObject(message, user, args[3], interaction, "waifu")
    if(!waifu) return true;
  }
  else {
    message.addResponse(eval(getLoc)("invalid_type"))
    return true
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

    case 'earn_GC':
      user.gachaCurrency = effect.value
      itemUsed = true
      message.addResponse(eval(getLoc)("give_GC"))
      break;
    case 'take_blood':
      let item = itemId == "77" ? items.get('78') : items.get('79')
      item.stackable = false
      item.complementaryInformation = waifu.id

      if(itemId == "80" && user.gachaCurrency < waifu.rarity*100)
        message.addResponse(eval(getLoc)("not_enough_gacha_currency"))
      else {
        if(itemId == "80") user._gachaCurrency -= waifu.rarity*100
        user.items.addItem(item)
        itemUsed = true
        message.addResponse(eval(getLoc)("take_blood_operation_successful"))
      }

      break;

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
      let dangoNumber = user.items.userConsumable.find((itemAndQty) => itemAndQty.item.id == itemId)!
      if(dangoNumber.qty >= 7){
        user.items.removeItemById(itemId, 7)
        user.reserveWaifu.push(new waifuClass(user, waifus.get("34"))) //Nagisa Furukawa
        message.addResponse(eval(getLoc)("summoned_nagisa"))
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
  if(itemUsed) user.items.removeItemById(itemId)
}
