import message from '../../class/message'
import user from '../../class/user'

commandManager?.create({
  name:"allexp",
  type:"CHAT_INPUT",
  description:"send all available waifus to explore",
})

export default async function allexp(message: message, user: user, args: Array<string>){
  let noWaifuEXP = true
  user.waifus.forEach(waifu => {
    if(waifu){
      if(waifu.action){
        noWaifuEXP = false
        let lvl = 2
        switch(true){
          case args[1] == "1h" || args[1] == "1":
            lvl = 1
            break;
          case args[1] == "8h" || args[1] == "8":
            lvl = 3
            break
          case args[1] == "24h" || args[1] == "24":
            lvl = 4
            break;
        }
        message.addResponse(eval(getLoc)("went_exploration"))
        waifu.action = {createdTimestamp:message.createdTimestamp, type:"exploration", timeWaiting: waifu.timeWaiting("exploration", lvl), lvl:lvl}
      }
    }
  });
  return noWaifuEXP
}
