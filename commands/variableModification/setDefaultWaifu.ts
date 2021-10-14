import message from '../../class/message'
import user from '../../class/user'
import Discord from  'discord.js'
import getParameterObject from '../util/getParameterObject'

commandManager?.create({
  name:"defaultwaifu",
  type:"CHAT_INPUT",
  description:"choose the waifu that would be used in a bot's multiplayer lobby",
  options:[
    {
      name:"w",
      description:"waifu slot -- what waifu do you want to use as default (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function setDefaultWaifu(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}

  const defaultWaifuName = waifu.name
  user.waifus.forEach((userWaifu, i) => {if(userWaifu?.id == waifu.id){user.defaultWaifu = i}})
  message.addResponse(eval(getLoc)("edit_default_waifu")); defaultWaifuName;
}
