import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import item from '../../class/item'
import {deepCopy} from '../../genericFunctions/copy'

export default async function useXP(message: message, user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)
  const amount = Math.floor(parseInt(args[2]))

  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  if(isNaN(amount) || amount < 1){message.reply(eval(getLoc)("amount_NaN")); return true;}

  const virginItem = deepCopy(items.get('-1') as item)//no effect item
  if(user.waifuXP < amount){message.reply(eval(getLoc)("user_xp_enough_xp")); return true;} // Check if the user has enough XP of the type he want to use
  virginItem.effects = [{effect:'earn_XP', value:[amount, false]}]
  user.waifuXP -= amount
  message.reply(eval(getLoc)("use_user_waifu_xp"))
  virginItem.use(message, user, waifuIndex)
}
