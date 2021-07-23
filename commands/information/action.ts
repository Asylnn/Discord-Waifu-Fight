import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import {milliToHours} from '../../genericFunctions/timeConversion'

export default async function showAction(message:message, user:user){
  let oneWaifuIsDoingAction = false
  user.waifus.forEach((waifu:waifu) => {
    if(waifu.action.isDoingAction){
      const actionType = eval(getLoc)(waifu.action.type)
      const timeLeft = milliToHours(waifu.action.createdTimestamp + waifu.action.timeWaiting - message.createdTimestamp)
      oneWaifuIsDoingAction = true
      message.reply(eval(getLoc)("waifu_is_doing_this_action")); actionType; timeLeft;
    }
  })

  if(!oneWaifuIsDoingAction) message.reply(eval(getLoc)("no_waifu_is_doing_action"))
}
