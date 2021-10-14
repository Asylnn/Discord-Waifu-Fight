import message from '../../class/message'
import user from '../../class/user'
import getParameterObject from '../util/getParameterObject'
import Discord from 'discord.js'

commandManager?.create({
  name:"stopaction",
  type:"CHAT_INPUT",
  description:"stop the action a waifu is doing",
  options:[
    {
      name:"w",
      description:"waifu slot -- what waifu do you want to explore with (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    }
  ],
})


export default async function stopaction(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}
  if(waifu.action){
    waifu.action = null
    message.addResponse(eval(getLoc)("stopping_action"))
  }
  else{
    message.addResponse(eval(getLoc)("not_doing_action"))
  }
}
