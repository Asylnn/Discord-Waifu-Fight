import user from '../../class/user'
import message from '../../class/message'
import Discord from 'discord.js'
import {IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'
import testWaifu from './testWaifu'
import sleep from '../../genericFunctions/sleep'
import waifu from '../../class/waifu'

type objectTypeList = "waifu" | "item" | "star_rating"
export default function getObject<objectType extends waifu>(message:message, user:user, index:string, interaction: Discord.CommandInteraction, objectType:objectTypeList){
  return new Promise(async (resolve: (value:objectType | null) => void) => {
    if("waifu"){
      let waifuIndex
      if(message.type != "interaction" || interaction.options.getInteger('w')){
        if(message.type != "interaction"){
          waifuIndex = index
        }
        else{
          waifuIndex = interaction.options.getInteger('w')!.toString()
        }
        resolve(testWaifu(message, user.waifus, Math.floor(parseInt(waifuIndex) - 1)) as objectType)
      }
      else{
        message.addResponse("Please select a waifu")
        message.addWaifuSelectMenu(user.waifus) //This method is only used here, delete that method?

        const collector = (await message.reply()).createMessageComponentCollector({componentType:'SELECT_MENU', idle:IDLE_TIME_OF_INTERACTIONS})

        collector.on('collect', (interaction: Discord.SelectMenuInteraction) => {
          message.haveToUpdate = true
          /*
          Since we are replying above, the message.reply in commands.ts won't work (can only reply one time), instead we need to use the method
          'update' of the newly created interaction, haveToUpdate makes sure we use that method in the class globalMessage.
          */
          message.channel = interaction
          resolve(testWaifu(message, user.waifus, parseInt(interaction.values[0])) as objectType)

        })
      }
    }
  })
}
