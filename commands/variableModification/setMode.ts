import message from '../../class/message'
import user from '../../class/user'
import gamemode from '../../class/types/gamemode'



export default async function setmode(message:message, user:user, args: Array<string>){
  if(!["osu", "fruits", "taiko", "mania"].includes(args[1])){message.reply(eval(getLoc)('wrong_gamemode')); return true}
  user.gamemode = args[1] as gamemode
  message.reply(eval(getLoc)("gamemode_select"))
}
