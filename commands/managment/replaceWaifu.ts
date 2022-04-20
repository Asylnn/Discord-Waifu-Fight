import message from '../../class/message'
import user from '../../class/user'
import testReserveWaifu from '../util/testReserveWaifu'
import waifu from '../../class/waifu'
import Discord from 'discord.js'
import {IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'
import checkClicker from '../util/checkClicker'

commandManager.create({
  name:"replace",
  type:"CHAT_INPUT",
  description:"replace a waifu by another waifu in reserve",
  options:[
    {
      name:"w",
      description:"waifu slot -- In which slot your waifu to be in (no input will open select menu)",
      required:true,
      type:"INTEGER"
    },{
      name:"rw",
      description:"reserve waifu slot",
      required:true,
      type:"INTEGER"
    },
  ],
})

export default async function replaceWaifu(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const waifuIndex = message.isInteraction ? interaction.options.getInteger("w")! : Math.floor(parseInt(args[1]) - 1)
  const reserveWaifuIndex = message.isInteraction ? interaction.options.getInteger("rw")! : Math.floor(parseInt(args[2]) - 1)

  let reserveWaifu = testReserveWaifu(message, user.reserveWaifu, reserveWaifuIndex)
  if(!reserveWaifu){return true}

  if(user.waifus.length < waifuIndex || waifuIndex < 0 || waifuIndex == undefined){message.addResponse(eval(getLoc)("invalid_waifu_replace_waifu")); return true;}
  if(user.waifus.some((waifu) => waifu?.id == reserveWaifu?.id)){message.addResponse(eval(getLoc)("duplicate_replace_waifu")); return true;}
  let isEmpty = true, remplacedWaifu = new waifu(user)
  if(user.waifus[waifuIndex]){
    remplacedWaifu = user.waifus[waifuIndex]!
    isEmpty = false
  }
  else{
    remplacedWaifu.name = eval(getLoc)("empty_slot")
  }

  message.addButton("confirm", "confirm", "PRIMARY")
  const collector = (await message.reply(eval(getLoc)("replace_waifu"))).createMessageComponentCollector({componentType:'BUTTON', idle:IDLE_TIME_OF_INTERACTIONS})

  collector.on('collect', (interaction: Discord.ButtonInteraction) => {
    message.channel = interaction
    message.haveToUpdate = true
    if (checkClicker(interaction, user.id)) return true;
    console.log(isEmpty)
    if(!isEmpty){

      console.log(remplacedWaifu)
      if(remplacedWaifu.action){
        remplacedWaifu.action = null
        message.addResponse(eval(getLoc)("no_longer_doing_action"))
      }
      user.reserveWaifu.push(remplacedWaifu)
    }
    user.waifus[waifuIndex] = reserveWaifu
    user.reserveWaifu.splice(reserveWaifuIndex, 1)
    message.reply(eval(getLoc)("remplaced_waifu"))
    user.save()
    collector.stop()
  })

}
