import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

export default async function swap(message: message, user: user, args: Array<string>){
  const indexWaifu1 = Math.floor(parseInt(args[1]) - 1)
  const indexWaifu2 = Math.floor(parseInt(args[2]) - 1)



  if(!testArg(message, user, indexWaifu1, "validWaifu")){return true;}
  if(!testArg(message, user, indexWaifu2, "validWaifu")){return true;}
  const tempwaifu = user.waifus[indexWaifu1]
  user.waifus[indexWaifu1] = user.waifus[indexWaifu2]
  user.waifus[indexWaifu2] = tempwaifu
  message.reply(eval(getLoc)("swap_complete"))
}
