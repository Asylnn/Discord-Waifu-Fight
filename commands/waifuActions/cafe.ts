import message from '../../class/message'
import user from '../../class/user'
import getParameterObject from '../util/getParameterObject'
import Discord from 'discord.js'

commandManager?.create({
  name:"maidcafe",
  type:"CHAT_INPUT",
  description:"maid cafe...",
  options:[
    {
      name:"w",
      description:"waifu slot -- what waifu do you want to explore with (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function exp(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}
  if(waifu.testSendMesAction(message, "waifu_already_doing_action")){return true;}
  let lvl = 2
  switch(true){
    case args[2] == "1h" || args[2] == "1":
      lvl = 1
      break;
    case args[2] == "8h" || args[2] == "8":
      lvl = 3
      break
    case args[2] == "24h" || args[2] == "24":
      lvl = 4
      break;
  }
  message.addResponse(eval(getLoc)("went_maid_cafe"))
  waifu.action = {createdTimestamp:message.createdTimestamp, type:"cafe", timeWaiting: waifu.timeWaiting("exploration", lvl), lvl:lvl}
}
