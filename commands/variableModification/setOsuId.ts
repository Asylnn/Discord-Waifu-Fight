import message from '../../class/message'
import user from '../../class/user'



export default async function setOsuId(message:message, user:user, args: Array<string>){
  const osuId = parseInt(args[1])
  if(isNaN(osuId)){message.reply(eval(getLoc)('nan_osu_id')); return true}
  user.osuId = osuId
  message.reply(eval(getLoc)("set_osu_id"))
}
