import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

export default async function setDefaultWaifu(message: message, user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)

  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  let defaultWaifuName = user.waifus[waifuIndex].name
  user.defaultWaifu = waifuIndex
  message.reply(eval(getLoc)("edit_default_waifu")); defaultWaifuName;
}
