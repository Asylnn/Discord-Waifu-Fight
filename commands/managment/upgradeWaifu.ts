import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import testWaifu from '../util/testWaifu'

export default async function upgradewaifu(message: message, user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)
  if(user.lvl < LEVEL_PERMISSIONS.upgrade){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  const waifu = testWaifu(message, user.waifus, waifuIndex)
  if(!waifu){return true;}
  //let waifu = user.waifus[waifuIndex]
  let reward = Math.floor((waifu.value*waifu.stars)/2)
  if(waifu.stars >= waifu.rarity + 1){message.reply(eval(getLoc)("upgrade_waifu_max")); return true;}
  if(reward > user.money){message.reply(eval(getLoc)("upgrade_waifu_insufficient_money")); return true;}
  if(args[2] != "c"){message.reply(eval(getLoc)("upgrade_waifu_confirm")); return true;}
  user._money -= reward
  waifu.stars++
  waifu.b_luck += 3*waifu.u_luck
  waifu.b_agi += 3*waifu.u_agi
  waifu.b_int += 3*waifu.u_int
  waifu.b_dext += 3*waifu.u_dext
  waifu.b_stg += 3*waifu.u_stg
  waifu.b_kaw += 3*waifu.u_kaw

  message.reply(eval(getLoc)("upgrade_waifu"))
}
