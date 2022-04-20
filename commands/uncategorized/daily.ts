import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import randInt from '../../genericFunctions/randInt'

commandManager?.create({
  name:"daily",
  type:"CHAT_INPUT",
  description:"get your daily reward!",
})

export default async function daily(message: message, user: user){
  const date = (new Date()).getDate()

  //if(user.dailyTimestamp == date){message.addResponse(eval(getLoc)("daily_wait")); return true;}
  user.dailyTimestamp = date
  const reward = 50 + user.lvl*2
  user.money = reward
  const rewardGC = 10 + Math.floor(user.lvl/2.5)
  user.gachaCurrency = rewardGC
  user.giveXP(8, message)
  message.addResponse(eval(getLoc)("daily"))
  if(randInt(7) != 0){return false;}
  message.addResponse(eval(getLoc)("daily_waifu"))
  let rand = randInt(11)
}
