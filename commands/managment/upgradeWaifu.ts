import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import {LEVEL_PERMISSIONS} from '../../files/config.json'


export default async function upgradewaifu(message: message, user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)
  if(user.lvl < LEVEL_PERMISSIONS.upgrade){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  let waifu = user.waifus[waifuIndex]
  let reward = Math.floor((waifu.value*waifu.stars)/2)
  if(waifu.stars >= waifu.rarity + 1){message.reply(eval(getLoc)("upgrade_waifu_max")); return true;}
  if(reward > user.money){message.reply(eval(getLoc)("upgrade_waifu_insufficient_money")); return true;}
  if(args[2] != "c"){message.reply(eval(getLoc)("upgrade_waifu_confirm")); return true;}
  user._money -= reward
  waifu.stars++
  waifu.b_luck += 5
  waifu.b_exp += 2*waifu.u_exp
  waifu.b_int += 2*waifu.u_int
  message.reply(eval(getLoc)("upgrade_waifu"))
}
