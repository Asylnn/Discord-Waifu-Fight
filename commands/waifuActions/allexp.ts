import message from '../../class/message'
import user from '../../class/user'

export default async function allexp(message: message, user: user, args: Array<string>){
  let noWaifuEXP = true
  user.waifus.forEach(waifu => {
    if(waifu.id != "-1"){
      if(!waifu.action.isDoingAction){
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
        message.reply(eval(getLoc)("went_exploration"))
        waifu.action = {isDoingAction:true, createdTimestamp:message.createdTimestamp, type:"exploration", timeWaiting: waifu.timeWaiting("exploration", lvl), lvl:lvl}
      }
    }
  });
  return noWaifuEXP
}
