import message from '../../class/message'
import user from '../../class/user'
import effect from '../../class/types/effect'
import {modificator} from '../../class/types/modificator'
import testItem from '../util/testItem'
import testWaifu from '../util/testWaifu'

export default async function useWaifuConsumable(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)
  const waifuIndex = Math.floor(parseInt(args[2]) - 1)

  const item = testItem(message, user.items.consumableWaifu, itemIndex)
  if(!item){return true;}
  const waifu = testWaifu(message, user.waifus, waifuIndex)
  if(!waifu){return true;}


  const effects = item.effects // Collection des effets de l'item usedItem
  let itemUsed = false
  effects.forEach((valueAndEffectType /*OR valueAndType*/: effect) => {
    const {value, effectType} = {...valueAndEffectType}

    switch(effectType){
      case 'extract_XP':

        const totalXP = Math.floor(waifu.totalXP*value[0])
        user.waifuXP += totalXP

        if(value[1]){
          user.waifus.splice(waifuIndex)
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
    }
  })

  if(itemUsed) user.items.removeItem(item.id)

}
