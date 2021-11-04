import message from '../../class/message'
import user from '../../class/user'
import Discord from  'discord.js'

commandManager?.create({
  name:"setosuname",
  type:"CHAT_INPUT",
  description:"linking your profile to your osu username if you changed it",
  options:[{
      name:"username",
      description:"your osu username",
      required:true,
      type:"STRING"
    }],
})

export default async function setOsuName(message:message, user:user, args: Array<string>, interaction:Discord.CommandInteraction){
  const osuName = !message.isInteraction ? args[1] : interaction.options.getString('username')!

  if(!osuName){message.addResponse(eval(getLoc)('no_osu_name')); return true}
  user.osuName = osuName
  message.addResponse(eval(getLoc)("set_osu_name"))
}
