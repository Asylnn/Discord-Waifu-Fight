import message from '../../class/message'
import Discord from 'discord.js'

export default async function textCreateacc(message: message, discordMessage: Discord.Message){
  if(await users.exists(discordMessage.author.id)){message.reply(eval(getLoc)("already_has_acc"))}
  message.reply(eval(getLoc)("in_private"))
  return true
}
