import message from '../../class/message'
import user from '../../class/user'
import seeReserve from './seeReserve'
import testReserveWaifu from '../util/testReserveWaifu'

export default async function reservewaifu(message: message, user: user, args: Array<string>){

  const waifuIndex = Math.floor(parseInt(args[1]) - 1)

  if(isNaN(waifuIndex)){
    seeReserve(message, user.reserveWaifu, 1, user.id, true)
  }
  else{
    const waifu = testReserveWaifu(message, user.waifus, waifuIndex)
    if(!waifu){return true;}
    waifu.showStats(message, waifuIndex)
  }
  return true
}
