import message from '../../class/message'
//import Discord from 'discord.js'
import {deepCopy} from '../../genericFunctions/copy'
import testAdmin from './testAdmin'



export default async function giveItem(message: message, args: Array<string>, discordMessage:any){

  if(testAdmin(message, discordMessage)) return true;

  if(!(await users.exists(discordMessage.mentions.users.first().id)))
  {message.reply("This user doesn't have an account"); return true;}

  if(!items.has(args[2]))
  {message.reply("This item doesn't exist!"); return true;}



  const user = await users.get(discordMessage.mentions.users.first().id)
  user.items.addItem(deepCopy(items.get(args[2])), parseInt(args[3]) | 1)
  message.reply("The item was given")
  user.save()
  return true
}
