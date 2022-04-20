import message from '../../class/message'
import user from '../../class/user'
import getParameterObject from '../util/getParameterObject'
import Discord from 'discord.js'


commandManager.create({
  name:"usewaifuxp",
  type:"CHAT_INPUT",
  description:"c o n s u m e",
  options:[
    {
      name:"amount",
      description:"amount of XP to give",
      required:true,
      type:"INTEGER"
    },{
      name:"w",
      description:"waifu slot -- Which waifu will get the XP (no input will open select menu)",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function useXP(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const amount = message.isInteraction ? interaction.options.getInteger('amount')! : Math.floor(parseInt(args[2]))
  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu) return true

  if(isNaN(amount) || amount < 1){message.addResponse(eval(getLoc)("amount_NaN")); return true;}

  if(user.waifuXP < amount){message.addResponse(eval(getLoc)("user_xp_enough_xp")); return true;} // Check if the user has enough XP of the type he want to use
  user.waifuXP -= amount
  waifu.giveXP(amount, message, false)
  message.addResponse(eval(getLoc)("use_user_waifu_xp"))
}
