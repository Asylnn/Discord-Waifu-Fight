import message from '../../class/message'
import user from '../../class/user'
import {MAX_TIER, PAR_ID} from '../../files/config.json'
import getParameterObject from '../util/getParameterObject'
import Discord from 'discord.js'

commandManager?.create({
  name:"decrypt",
  type:"CHAT_INPUT",
  description:"make a waifu decrypt a parchment for potential reward",
  options:[
    {
      name:"w",
      description:"waifu slot -- what waifu do you want to decrypt with (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function decrypt(message: message,user : user, args: Array<string>, interaction: Discord.CommandInteraction){

  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}

  if(waifu.testSendMesAction(message, "waifu_already_doing_action")){return true;}
  for(let i = 0; i <= MAX_TIER; i++){
    if(user.items.hasItem(PAR_ID[i])){
      waifu.action = {createdTimestamp:message.createdTimestamp, type:"decryption", timeWaiting: waifu.timeWaiting("decryption", i), lvl:i}
      user.items.removeItem(PAR_ID[i])
      message.addResponse(eval(getLoc)("waifu_decrypt"))
      break;
    }
    else if(i == MAX_TIER){
       message.addResponse(eval(getLoc)("not_having_par"))
    }
  }
}
