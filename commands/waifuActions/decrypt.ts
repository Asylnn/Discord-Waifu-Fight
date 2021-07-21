import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import {MAX_TIER, PAR_ID} from '../../files/config.json'

export default async function decrypt(message: message,user : user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)

  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  let waifu = user.waifus[waifuIndex]
  if(waifu.testSendMesAction(message, "waifu_already_doing_action")){return true;}
  for(let i = 0; i <= MAX_TIER; i++){
    if(user.items.hasItem(PAR_ID[i])){
      waifu.action = {isDoingAction: true, createdTimestamp:message.createdTimestamp, type:"decryption", timeWaiting: waifu.timeWaiting("decryption", i), lvl:i}
      user.items.removeItem(PAR_ID[i])
      message.reply(eval(getLoc)("waifu_decrypt"))
      break;
    }
    else if(i == MAX_TIER){
       message.reply(eval(getLoc)("not_having_par"))
    }
  }
}
