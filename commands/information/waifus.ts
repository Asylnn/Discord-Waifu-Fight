import message from '../../class/message'
import user from '../../class/user'
import Discord from 'discord.js'

commandManager?.create({
  name:"waifus",
  type:"USER",
})

commandManager?.create({
  name:"waifus",
  type:"CHAT_INPUT",
  description:"see all your waifus",
  options:[{
    name:"user",
    description:"person you want to see the waifus of (default is you)",
    required:false,
    type:"USER"
  }],
})

export default async function waifus(message:message, user:user, discordMessage:Discord.CommandInteraction | Discord.ContextMenuInteraction | Discord.Message){
  let userId: string | null = null
  if(discordMessage instanceof Discord.CommandInteraction || discordMessage instanceof Discord.ContextMenuInteraction){
    if(discordMessage.isContextMenu()){
      userId = discordMessage.targetId
    }
    else {
      if(discordMessage.options.getUser("user")){
        userId = discordMessage.options.getUser("user")!.id
      }
    }
  }


  if(userId){
    if(!(await users.exists(userId))){message.addResponse(eval(getLoc)("arg_no_account")); return true;}
    user = await users.get(userId)
  }

  let allSlotTaken = true
  let missingWaifus = ""
  user.waifus.forEach((waifu, index) => {
    if(waifu){
      message.embeds.push(waifu.showStats(message, index))
    }
    else{
      allSlotTaken = false
      missingWaifus += (index + 1) + " "
    }
  })
  missingWaifus = allSlotTaken ? "all slot are taken!" : "slot with no waifu : " + missingWaifus
  message.addResponse(missingWaifus)
  return true
}
