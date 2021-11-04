import message from '../../class/message'
import user from '../../class/user'
import Discord from  'discord.js'

commandManager?.create({
  name:"setosuid",
  type:"CHAT_INPUT",
  description:"linking your profile to your osu id",
  options:[{
      name:"id",
      description:"your osu id (the number in the url of your profile on the osu website)",
      required:true,
      type:"NUMBER"
    }],
})

export default async function setOsuId(message:message, user:user, args: Array<string>, interaction:Discord.CommandInteraction){
  const osuid = !message.isInteraction ? parseInt(args[1]) : interaction.options.getInteger('id')!

  if(isNaN(osuid)){message.addResponse(eval(getLoc)('nan_osu_id')); return true}
  user.osuId = osuid
  message.addResponse(eval(getLoc)("set_osu_id"))
}
