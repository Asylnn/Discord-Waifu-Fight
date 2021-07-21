import message from '../../class/message'
import waifu from '../../class/waifu'
//import Discord from 'discord.js'
import truncate from '../../genericFunctions/truncate'
import testAdmin from './testAdmin'


export default async function giveWaifu(message: message, discordMessage: any){
  if(testAdmin(message, discordMessage)){ return true;}

  if(!(await users.exists(discordMessage.mentions.users.first().id))){message.reply("This user doesn't have an account"); return true;}
  let waifuId = truncate(message.content, 1)
  if(!waifus.has(waifuId)){message.reply("This waifu doesn't exists"); return true;}

  const user = await users.get(discordMessage.mentions.users.first().id)

  user.reserveWaifu.push(new waifu(user, waifus.get(waifuId)))
  message.reply("The waifu was given")
  user.save()
  return true

}
