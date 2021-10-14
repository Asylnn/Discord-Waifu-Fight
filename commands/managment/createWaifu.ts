import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import {LEVEL_PERMISSIONS, COST_CREATE_WAIFU} from '../../files/config.json'

export default async function createWaifu(message: message, user: user, args: Array<string>){

  if(user.lvl < LEVEL_PERMISSIONS.createWaifu){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  let url = args[1]
  if(url == undefined){message.addResponse(eval(getLoc)("invalid_url")); return true;}
  let customWaifu = new waifu(user, waifus.get("0"))
  customWaifu.imgURL = url
  try {
    customWaifu.showStats(message, user.reserveWaifu.length + 1)
    user.reserveWaifu.push(customWaifu)
    user._money -= COST_CREATE_WAIFU
  } catch (e) {
    message.addResponse(eval(getLoc)("error_create_custom_waifu"))
  }
}
