import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import effectType from '../../class/types/effectType'
import waifuClass from '../../class/waifu'

export default async function useUserConsumable(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)

  if(!testArg(message, user, itemIndex, "validItem" , "userconsumable")){return true;}

  const item = user.items.consumableUser[itemIndex].item
  let itemUsed = false
  item.effects.forEach((valueAndEffectType /*OR valueAndType*/: {effectType:effectType, value:any}) => {
    const {value, effectType} = {...valueAndEffectType}


    switch(effectType){
      case 'set_multxp':
        user.multXP = value
        message.reply("items.ts l69 <TEMP>| xp multiplicator successfly set")
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
        let dangoNumber = user.items[item.type].find((itemAndQty:  any) => itemAndQty.item.id == item.id)

        if(!dangoNumber) return false;
        if(dangoNumber.qty >= 7){
          user.items.removeItem(item.id, 7)
          user.reserveWaifu.push(new waifuClass(user, waifus.get("34"))) //Nagisa Furukawa
          message.reply(eval(getLoc)("summoned_nagisa"))
          itemUsed = true
        }
        else{
          message.reply(eval(getLoc)("not_enough_dango"))
        }
        break;
      case 'earn_waifuXP':
        message.reply(eval(getLoc)("got_user_waifu_xp"))
        user.waifuXP += value
        itemUsed = true
        break;
      case 'quest_reroll':
        user.quests.refreshQuests()
        message.reply(eval(getLoc)("quest_reroll"))
        itemUsed = true
        break;
    }
  });

  if(itemUsed) user.items.removeItem(item.id)

}
