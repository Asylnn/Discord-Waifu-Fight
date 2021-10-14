import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import truncate from '../../genericFunctions/truncate'
import Discord from  'discord.js'
import getParameterObject from '../util/getParameterObject'

commandManager?.create({
  name:"editname",
  type:"CHAT_INPUT",
  description:"edit the name of a waifu",
  options:[
    {
      name:"name",
      description:"the new name of the waifu",
      required:true,
      type:"STRING"
    },
    {
      name:"w",
      description:"waifu slot -- what waifu you want to rename (no input will open select menu) -- help slot",
      required:false,
      type:"INTEGER"
    }
  ],
})


export default async function editname(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  if(user.lvl < LEVEL_PERMISSIONS.editname){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}


  let newWaifuName = ""
  if(message.type == "interaction"){
    newWaifuName = interaction.options.getString('name')!
  }
  else{
    newWaifuName = truncate(message.content, 1)
  }

  if(newWaifuName.length > 250){message.addResponse(eval(getLoc)("waifu_name_too_long")); return true;}
  newWaifuName = newWaifuName.replace(".", "")
  newWaifuName = newWaifuName.replace("/", "")
  waifu.name = newWaifuName
  message.addResponse(eval(getLoc)("waifu_name_edit"))
}
