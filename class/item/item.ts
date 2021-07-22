import globalMessage from '../message'
import user from '../user'
import waifuClass from '../waifu'
import { modificator } from '../types/modificator'
import itemType from '../types/itemType'

type effectType = "set_multxp" | 'earn_waifuXP' | 'extract_XP' |'add_modificator' | 'earn_money' | 'set_multxp' | 'give_item' | 'give_waifu' | 'summon_nagisa' | 'earn_XP' | 'level_up' | 'quest_reroll' | 'extract_item'


export default abstract class item {
  protected readonly id: string
  protected readonly name: string
  protected readonly description: string
  /*protected effects: Array<{effect:effectType, value:any}> = []
  protected modificators: Array<modificator> = []*/
  protected readonly rarity: number
  protected readonly value: number
  protected readonly img: string

  constructor(id = "-1", name = "noName", description = "noDesc", rarity = 0, value = -69, img = ""){
    this.id = id
    this.name = name
    this.description = description
    this.rarity = rarity
    this.value = value
    this.img = img
  }

  abstract use(message: globalMessage): boolean

  use(message: globalMessage, user: user, index = 1){
    const effects = this.effects // Collection des effets de l'item usedItem
    const waifu = user.waifus[index] as waifuClass// Soit waifu, soit undefined
    let itemUsed = false
    effects.forEach((valueAndType /*OR valueAndType*/: {effect:effectType, value:any}) => {
    const {value, effect} = {...valueAndType /*OR valueAndType*/}

      switch(effect){
        case 'extract_XP':

          const totalXP = Math.floor(waifu.totalXP*value[0])
          user.waifuXP += totalXP

          if(value[1]){
            user.waifus.splice(index)
            message.reply(eval(getLoc)("extract_xp_die"))
          }
          else {
            waifu.lvl = 1
            waifu.xp = 0
            waifu.b_luck = waifu.o_luck
            waifu.b_exp = waifu.o_exp
            waifu.b_int = waifu.o_int
            waifu.stars = 1
          }
          message.reply(eval(getLoc)("extract_xp_success"))
          itemUsed = true

          break;
        case 'set_multxp':
          user.multXP = value
          message.reply("items.ts l69 <TEMP>| xp multiplicator successfly set")
          break;
        case 'add_modificator':
          for(const modificator of value as Array<modificator>){

            if(!waifu.modificators.some((waifuModificators: modificator) => waifuModificators.origin == modificator.origin)){
              waifu.modificators.push(modificator)

              message.reply(eval(getLoc)("use_modificator"))
              itemUsed = true
            }
            else {
              message.reply(eval(getLoc)("already_used_item_modificator"))
            }
          }
          break;
        case 'earn_money':
          user.money = value
          message.reply(eval(getLoc)("earn_money"))
          itemUsed = true
          break;
        case 'give_item':
          user.items.addItem(value)
          message.reply(eval(getLoc)("got_item"))
          itemUsed = true
          break;
        case 'give_waifu':
          user.reserveWaifu.push(new waifuClass(user, value))
          message.reply(eval(getLoc)("got_waifu"))
          itemUsed = true
          break;
        case 'summon_nagisa':
          let dangoNumber = user.items[this.type].find((itemAndQty) => itemAndQty.item.id == this.id)

          if(!dangoNumber) return false;
          if(dangoNumber.qty >= 7){
            user.items.removeItem(this.id, 7)
            user.reserveWaifu.push(new waifuClass(user, waifus.get("34"))) //Nagisa Furukawa
            message.reply(eval(getLoc)("summoned_nagisa"))
            itemUsed = true
          }
          else{
            message.reply(eval(getLoc)("not_enough_dango"))
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
        case 'earn_waifuXP':
          message.reply(eval(getLoc)("got_user_waifu_xp"))
          user.waifuXP += value
          itemUsed = true
          break;
        case 'level_up':
          if(waifu.lvl < waifu.maxLvl){
            waifu.giveXP(waifu.xplvlup, message, false)
            itemUsed = true
          }
          else{
            message.reply(eval(getLoc)("lvl_upper_lvl_max"))
          }
          break;
      case 'quest_reroll':
        user.quests.refreshQuests()
        message.reply(eval(getLoc)("quest_reroll"))
        itemUsed = true
        break;
      case 'extract_item':
        const hasAtLeastOneItem = waifu.equipedItems.some(item => item.id != "-1")
        if(hasAtLeastOneItem){
          const allItemTierBellowExtractorTier = !waifu.equipedItems.some(item => item.tier > value)
          if(allItemTierBellowExtractorTier){
            waifu.equipedItems.forEach((equipedItem, i) => {
              user.items.addItem(equipedItem)
              waifu.equipedItems[i] = new item()
            })
            message.reply(eval(getLoc)("extracted_item"))
            itemUsed = true
          }
          else{
            message.reply(eval(getLoc)("extractor_level_too_low_equiped"))
          }
        }
        else{
          message.reply(eval(getLoc)("waifu_no_item_equiped"))
        }
        break;
      }
    })

    return itemUsed
  }
}



/*message.reply(eval(getLoc)("equiping_item"))
message.reply(eval(getLoc)("waifu_already_equiped_item"))
message.reply(eval(getLoc)("waifu_unequiping_item"))
message.reply(eval(getLoc)("waifu_equiping_item"))*/
