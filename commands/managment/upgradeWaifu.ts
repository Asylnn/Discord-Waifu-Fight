import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS, TEST_BUILD} from '../../files/config.json'
import Discord from 'discord.js'
import getParameterObject from '../util/getParameterObject'


commandManager.create({
  name:"upgrade",
  type:"CHAT_INPUT",
  description:"Upgrade a waifu",
  options:[
    {
      name:"w",
      description:"waifu slot -- Which waifu will analyse an artifact (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function upgradewaifu(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  if(user.lvl < LEVEL_PERMISSIONS.upgrade && !TEST_BUILD){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}
  //let waifu = user.waifus[waifuIndex]
  let reward = Math.floor((waifu.value*waifu.stars)/2)
  if(waifu.stars >= waifu.rarity + 1){message.addResponse(eval(getLoc)("upgrade_waifu_max")); return true;}
  if(reward > user.money){message.addResponse(eval(getLoc)("upgrade_waifu_insufficient_money")); return true;}
  if(args[2] != "c"){message.addResponse(eval(getLoc)("upgrade_waifu_confirm")); return true;}
  user._money -= reward
  waifu.stars++
  waifu.b_luck += 3*waifu.u_luck
  waifu.b_agi += 3*waifu.u_agi
  waifu.b_int += 3*waifu.u_int
  waifu.b_dext += 3*waifu.u_dext
  waifu.b_stg += 3*waifu.u_stg
  waifu.b_kaw += 3*waifu.u_kaw

  message.addResponse(eval(getLoc)("upgrade_waifu"))
}
