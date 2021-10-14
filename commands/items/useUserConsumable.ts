import message from '../../class/message'
import user from '../../class/user'

import effectType from '../../class/types/effectType'
import waifuClass from '../../class/waifu'
import testItem from '../util/testItem'

export default async function useUserConsumable(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)

  const items = user.items['consumableUser']
  const item = testItem(message, items, itemIndex)
  if(!item){return true}
  let itemUsed = false
  item.effects
  item.effects.forEach((valueAndEffectType /*OR valueAndType*/: {effectType:effectType, value:any}) => {
    const {value, effectType} = {...valueAndEffectType}


    switch(effectType){
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
        let dangoNumber = user.items.consumableWaifu.find((itemAndQty:  any) => itemAndQty.item.id == item.id)

        if(!dangoNumber) return false;
        if(dangoNumber.qty >= 7){
          user.items.removeItem(item.id, 7)
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
  });
  if(itemUsed) user.items.removeItem(item.id)
}
