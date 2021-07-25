import message from '../../class/message'
import user from '../../class/user'
import gamemode from '../../class/types/gamemode'



export default async function setmode(message:message, user:user, args: Array<string>){
  if(!["osu", "fruits", "taiko", "mania", "std", "catch"].includes(args[1])){message.reply(eval(getLoc)('wrong_gamemode')); return true}
  if(args[1] == "std") args[1] = "osu"
  if(args[1] == "catch") args[1] = "fruits"

  user.gamemode = args[1] as gamemode
  message.reply(eval(getLoc)("gamemode_select"))
}
