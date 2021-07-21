import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

export default async function exp(message: message, user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)
  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  const waifu = user.waifus[waifuIndex]
  if(waifu.testSendMesAction(message, "waifu_already_doing_action")){return true;}
  let lvl = 2
  switch(true){
    case args[2] == "1h" || args[2] == "1":
      lvl = 1
      break;
    case args[2] == "8h" || args[2] == "8":
      lvl = 3
      break
    case args[2] == "24h" || args[2] == "24":
      lvl = 4
      break;
  }
  message.reply(eval(getLoc)("went_exploration"))
  waifu.action = {isDoingAction:true, createdTimestamp:message.createdTimestamp, type:"exploration", timeWaiting: waifu.timeWaiting("exploration", lvl), lvl:lvl}
}
