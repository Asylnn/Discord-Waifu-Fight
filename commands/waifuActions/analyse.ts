import message from '../../class/message'
import user from '../../class/user'
import Discord from  'discord.js'
import getParameterObject from '../util/getParameterObject'



commandManager.create({
  name:"analyse",
  type:"CHAT_INPUT",
  description:"Make a waifu analyze an artifact for potential rewards",
  options:[
    {
      name:"w",
      description:"waifu slot -- Which waifu will analyse an artifact (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function analyse(message :message ,user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}

  if(waifu.testSendMesAction(message, "waifu_already_doing_action")){return true;}
  if(!user.items.hasItem("1")){message.addResponse(eval(getLoc)("not_having_artefact")); return true;}

  waifu.action = {createdTimestamp:message.createdTimestamp, type:"analyse", timeWaiting: waifu.timeWaiting("analyse", user.anaLevel), lvl:user.anaLevel}
  user.items.removeItem("1") //artifact
  message.addResponse(eval(getLoc)("waifu_analyse"))

}
