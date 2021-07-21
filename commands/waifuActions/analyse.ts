import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

export default async function analyse(message :message ,user: user, args: Array<string>){
  const waifuIndex = Math.floor(parseInt(args[1]) - 1)

  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  const waifu = user.waifus[waifuIndex]
  if(waifu.testSendMesAction(message, "waifu_already_doing_action")){return true;}
  if(!user.items.hasItem("1")){message.reply(eval(getLoc)("not_having_artefact")); return true;}

  waifu.action = {isDoingAction:true, createdTimestamp:message.createdTimestamp, type:"analyse", timeWaiting: waifu.timeWaiting("analyse", user.anaLevel), lvl:user.anaLevel}
  user.items.removeItem("1") //artifact
  message.reply(eval(getLoc)("waifu_analyse"))
}
