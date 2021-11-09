import message from '../../class/message'
import user from '../../class/user'
import item from '../../class/item/consumableWaifu'
import {deepCopy} from '../../genericFunctions/copy'
import getParameterObject from '../util/getParameterObject'
import Discord from 'discord.js'


commandManager.create({
  name:"use",
  type:"CHAT_INPUT",
  description:"c o n s u m e",
  options:[{
      name:"w",
      description:"waifu slot -- Which waifu will analyse an artifact (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    },{
      name:"amount",
      description:"amount of XP to give",
      required:true,
      type:"INTEGER"
    }
  ],
})

export default async function useXP(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const amount = message.isInteraction ? interaction.options.getInteger('amount')! : Math.floor(parseInt(args[1]) - 1)

  const waifu = await getParameterObject(message, user, args[3], interaction, "waifu")
  if(!waifu) return true

  if(isNaN(amount) || amount < 1){message.addResponse(eval(getLoc)("amount_NaN")); return true;}

  const virginItem = deepCopy(items.get('-1') as item)//no effect item
  if(user.waifuXP < amount){message.addResponse(eval(getLoc)("user_xp_enough_xp")); return true;} // Check if the user has enough XP of the type he want to use
  virginItem.effects = [{effectType:'earn_XP', value:[amount, false]}]
  user.waifuXP -= amount
  waifu.giveXP(amount, message, false)
  message.addResponse(eval(getLoc)("use_user_waifu_xp"))
}
