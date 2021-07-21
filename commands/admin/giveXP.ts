import message from '../../class/message'
import testAdmin from './testAdmin'

export default async function givexp(message: message, args: Array<string>, discordMessage: any){
  if(testAdmin(message, discordMessage)){ return true;}
  if(!(await users.exists(discordMessage.mentions.users.first().id))){message.reply("This user doesn't have an account"); return true;}

  const user = await users.get(discordMessage.mentions.users.first().id)
  user.waifuXP += parseInt(args[2])

  message.reply("Success!")
  user.save()
  return true
}
