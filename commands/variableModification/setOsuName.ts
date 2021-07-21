import message from '../../class/message'
import user from '../../class/user'



export default async function setOsuName(message:message, user:user, args: Array<string>){
  const osuName = args[1]
  if(!osuName){message.reply(eval(getLoc)('no_osu_name')); return true}
  user.osuName = osuName
  message.reply(eval(getLoc)("set_osu_name"))
}
