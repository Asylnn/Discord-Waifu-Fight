import message from '../../class/message'
import user from '../../class/user'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import testReserveWaifu from '../util/testReserveWaifu'
import Discord from 'discord.js'
import createSimpleEmbed from '../util/createSimpleEmbed'

commandManager.create({
  name:"reserve",
  type:"CHAT_INPUT",
  description:"see the waifus in your reserve",
  options:[
    {
      name:"rw",
      description:"reserve waifu slot",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function reservewaifu(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){

  const waifuIndex = message.isInteraction ? interaction.options.getString("rw") : +Math.floor(parseInt(args[1]) - 1)

  if(isNaN(+waifuIndex!)){
    const numberOfPages = Math.ceil(user.reserveWaifu.length/OBJECT_PER_PAGE)
    message.createPageInteraction(numberOfPages, page => {
      let content = ""
      for (var i = (page - 1)*OBJECT_PER_PAGE; i < page*OBJECT_PER_PAGE && i < user.reserveWaifu.length; i++) {

        const lvl = "LV " + user.reserveWaifu[i].lvl
        const star = "★".repeat(user.reserveWaifu[i].stars)
        content += `${i+1}: ${user.reserveWaifu[i].name}${star} ${lvl} ${user.reserveWaifu[i].rarityName(message)}\r\n`
      }
      return createSimpleEmbed(eval(getLoc)('reserve_title'), content+" ")
    })
  }
  else{
    const waifu = testReserveWaifu(message, user.reserveWaifu, +waifuIndex!)
    if(!waifu){return true;}

    message.embeds.push(waifu.showStats(message, +waifuIndex!))
  }
  return true
}
