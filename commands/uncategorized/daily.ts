import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import randInt from '../../genericFunctions/randInt'

export default async function daily(message: message, user: user){
  const date = (new Date()).getDate()

  if(user.dailyTimestamp == date){message.reply(eval(getLoc)("daily_wait")); return true;}
  user.dailyTimestamp = date
  const reward = 160 + user.lvl*2
  user.money = reward
  user.giveXP(8, message)
  message.reply(eval(getLoc)("daily"))
  if(randInt(7) != 0){return false;}
  message.reply(eval(getLoc)("daily_waifu"))
  let rand = randInt(11)
  switch(true){
    case rand <= 3:
      user.reserveWaifu.push(new waifu(user, waifus.get("6"))) //Kurumi Tokisaki
      break;
    case rand <= 7:
      user.reserveWaifu.push(new waifu(user, waifus.get("7"))) //Stephanie Dola
      break;
    case rand <= 9:
      user.reserveWaifu.push(new waifu(user, waifus.get("8"))) //Yuu Koito
      break;
    case rand == 10:
      user.reserveWaifu.push(new waifu(user, waifus.get("35"))) //Zero Two
      break;
  }
}
