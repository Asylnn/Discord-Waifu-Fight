import message from '../../class/message'
import user from '../../class/user'
import testReserveWaifu from '../util/testReserveWaifu'
import waifu from '../../class/waifu'

export default async function replaceWaifu(message: message, user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)
  const reserveWaifuIndex = Math.floor(parseInt(args[2]) - 1)

  let reserveWaifu = testReserveWaifu(message, user.reserveWaifu, reserveWaifuIndex)
  if(!reserveWaifu){return true}

  if(user.waifus.length < waifuIndex || waifuIndex < 0 || waifuIndex == undefined){message.addResponse(eval(getLoc)("invalid_waifu_replace_waifu")); return true;}
  if(user.waifus.some((waifu) => waifu?.id == reserveWaifu?.id)){message.addResponse(eval(getLoc)("duplicate_replace_waifu")); return true;}
  let isEmpty = true, remplacedWaifu = new waifu(user)
  if(user.waifus[waifuIndex]){
    remplacedWaifu = user.waifus[waifuIndex]!
    isEmpty = false
  }
  else{
    remplacedWaifu.name = eval(getLoc)("empty_slot")
  }
  if(args[3] == "c"){
    if(!isEmpty){
      if(remplacedWaifu.action){
        remplacedWaifu.action = null
        message.addResponse(eval(getLoc)("no_longer_doing_action"))
      }
      user.reserveWaifu.push(remplacedWaifu)
    }
    user.waifus[waifuIndex] = reserveWaifu
    user.reserveWaifu.splice(reserveWaifuIndex)
    message.addResponse(eval(getLoc)("remplaced_waifu"))
  }
  else {
    message.addResponse(eval(getLoc)("replace_waifu"))
  }
}
