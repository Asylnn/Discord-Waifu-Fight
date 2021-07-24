import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import effect from '../../class/types/effect'
import {modificator} from '../../class/types/modificator'

export default async function useWaifuConsumable(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)
  const waifuIndex = Math.floor(parseInt(args[2]) - 1)

  if(!testArg(message, user, itemIndex, "validItem", "consumablewaifu")){return true;}
  const item = user.items.consumableWaifu[itemIndex].item
  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}


  const effects = item.effects // Collection des effets de l'item usedItem
  const waifu = user.waifus[waifuIndex]// Soit waifu, soit undefined
  let itemUsed = false
  effects.forEach((valueAndEffectType /*OR valueAndType*/: effect) => {
    const {value, effectType} = {...valueAndEffectType}

    switch(effectType){
      case 'extract_XP':

        const totalXP = Math.floor(waifu.totalXP*value[0])
        user.waifuXP += totalXP

        if(value[1]){
          user.waifus.splice(waifuIndex)
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
          message.reply(eval(getLoc)("lvl_upper_lvl_max"))
        }
        break;
    }
  })

  if(itemUsed) user.items.removeItem(item.id)

}
