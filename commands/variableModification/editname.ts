import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import truncate from '../../genericFunctions/truncate'

export default async function editname(message: message, user: user, args: Array<string>){
  const waifuIndex = parseInt(args[1]) - 1

  if(user.lvl < LEVEL_PERMISSIONS.editname){message.reply(eval(getLoc)("lvl_too_low")); return true;}
  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  let waifu = user.waifus[waifuIndex]

  let newWaifuName = truncate(message.content, 1)
  if(newWaifuName.length > 250){message.reply(eval(getLoc)("waifu_name_too_long")); return true;}
  newWaifuName = newWaifuName.replace(".", "")
  newWaifuName = newWaifuName.replace("/", "")
  waifu.name = newWaifuName
  message.reply(eval(getLoc)("waifu_name_edit"))
}
