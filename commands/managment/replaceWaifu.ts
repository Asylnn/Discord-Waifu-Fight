import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import waifu from '../../class/waifu'

export default async function replaceWaifu(message: message, user: user, args: Array<string>){
  const reserveWaifuIndex = Math.floor(parseInt(args[1]) - 1)
  const waifuIndex = Math.floor(parseInt(args[2]) - 1)

  if(!testArg(message, user, reserveWaifuIndex, "validReserveWaifu")){return true;}
  if(user.waifus.length < waifuIndex || waifuIndex < 0 || waifuIndex == undefined){message.reply(eval(getLoc)("invalid_waifu_replace_waifu")); return true;}
  let reserveWaifu = user.reserveWaifu[reserveWaifuIndex]
  let isEmpty = true, remplacedWaifu = new waifu(user)
  if(user.waifus[waifuIndex].id != "-1"){
    remplacedWaifu = user.waifus[waifuIndex]
    isEmpty = false
  }
  else{
    remplacedWaifu.name = eval(getLoc)("empty_slot")
  }
  if(args[3] == "c"){
    if(!isEmpty){
      if(remplacedWaifu.action.isDoingAction){
        remplacedWaifu.action.isDoingAction = false
        message.reply(eval(getLoc)("no_longer_doing_action"))
      }
      user.reserveWaifu.push(remplacedWaifu)
    }
    user.waifus[waifuIndex] = reserveWaifu
    user.reserveWaifu.splice(reserveWaifuIndex)
    message.reply(eval(getLoc)("remplaced_waifu"))
  }
  else {
    message.reply(eval(getLoc)("replace_waifu"))
  }
}
