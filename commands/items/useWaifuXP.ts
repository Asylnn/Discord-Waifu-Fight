import message from '../../class/message'
import user from '../../class/user'
import testWaifu from '../util/testWaifu'
import item from '../../class/item/consumableWaifu'
import {deepCopy} from '../../genericFunctions/copy'

export default async function useXP(message: message, user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)
  const amount = Math.floor(parseInt(args[2]))

  const waifu = testWaifu(message, user.waifus, waifuIndex)
  if(!waifu){return true;}
  if(isNaN(amount) || amount < 1){message.addResponse(eval(getLoc)("amount_NaN")); return true;}

  const virginItem = deepCopy(items.get('-1') as item)//no effect item
  if(user.waifuXP < amount){message.addResponse(eval(getLoc)("user_xp_enough_xp")); return true;} // Check if the user has enough XP of the type he want to use
  virginItem.effects = [{effectType:'earn_XP', value:[amount, false]}]
  user.waifuXP -= amount
  waifu.giveXP(amount, message, false)
  message.addResponse(eval(getLoc)("use_user_waifu_xp"))
}
