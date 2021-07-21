import message from '../../class/message'
import testAdmin from './testAdmin'

export default async function givebox(message: message, args: Array<string>, discordMessage:any){
  if(testAdmin(message, discordMessage)) return true;
  if(!(await users.exists(discordMessage.mentions.users.first().id))){message.reply("This user doesn't have an account"); return true;}

  const user = await users.get(discordMessage.mentions.users.first().id)
  user.boxs.push(parseInt(args[2]))
  user.save()
  message.reply("The user successfully got the box")
  return true
}
