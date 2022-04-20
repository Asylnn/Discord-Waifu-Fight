import message from '../../class/message'
import user from '../../class/user'
import testWaifu from '../util/testWaifu'
import Discord from 'discord.js'

commandManager.create({
  name:"swap",
  type:"CHAT_INPUT",
  description:"swap two equiped waifus",
  options:[
    {
      name:"w1",
      description:"first waifu slot",
      required:true,
      type:"INTEGER"
    },{
      name:"w2",
      description:"second waifu slot",
      required:true,
      type:"INTEGER"
    },
  ],
})

export default async function swap(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const indexWaifu1 = message.isInteraction ? interaction.options.getInteger("w1")! : Math.floor(parseInt(args[1]) - 1)
  const indexWaifu2 = message.isInteraction ? interaction.options.getInteger("w2")! : Math.floor(parseInt(args[2]) - 1)

  const waifu1 = testWaifu(message, user.waifus, indexWaifu1)
  const waifu2 = testWaifu(message, user.waifus, indexWaifu2)
  if(!waifu1 || !waifu2){return true;}

  user.waifus[indexWaifu1] = waifu2
  user.waifus[indexWaifu2] = waifu1
  message.addResponse(eval(getLoc)("swap_complete"))
}
