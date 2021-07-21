import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

export default async function stopaction(message: message, user: user, args: Array<string>){
  const indexWaifu = Math.floor(parseInt(args[1]) - 1)

  if(!testArg(message, user, indexWaifu, "validWaifu")){return true;}
  let waifu = user.waifus[indexWaifu]
  if(waifu.action.isDoingAction){
    waifu.action.isDoingAction = false
    message.reply(eval(getLoc)("stopping_action"))
  }
  else{
    message.reply(eval(getLoc)("not_doing_action"))
  }
}
