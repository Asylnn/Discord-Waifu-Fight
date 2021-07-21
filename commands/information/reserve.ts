import message from '../../class/message'
import user from '../../class/user'
import seeReserve from './seeReserve'
import testArg from '../util/testArguments'

export default async function reservewaifu(message: message, user: user, args: Array<string>){

  const waifuIndex = Math.floor(parseInt(args[1]) - 1)

  if(isNaN(waifuIndex)){
    seeReserve(message, user.reserveWaifu, 1, user.id, true)
  }
  else{
    if(testArg(message, user, waifuIndex, "validReserveWaifu")){
      user.reserveWaifu[waifuIndex].showStats(message, waifuIndex)
    }
    else {return false}
  }
  return true
}
