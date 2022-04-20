import message from '../../class/message'
import user from '../../class/user'
import {ALL_LANGUAGES, ALL_LANGUAGES_FULL_NAME, IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'
import Discord from 'discord.js'

commandManager?.create({
  name:"language",
  type:"CHAT_INPUT",
  description:"select a new language for the bot"
})


export default async function language(message: message, user: user){

  const actionRow = new Discord.MessageActionRow()
  const selectMenu = new Discord.MessageSelectMenu()
  selectMenu.setCustomId('language')
  selectMenu.setPlaceholder('Select A Language')
  const options: Array<Discord.MessageSelectOptionData> = ALL_LANGUAGES.map((language, i) => {
    return {
      label:ALL_LANGUAGES_FULL_NAME[i],
      value:language
    }
  })


  selectMenu.setOptions(options)
  actionRow.addComponents(selectMenu)
  message.components.push(actionRow)

  const collector = (await message.reply("Please select a language")).createMessageComponentCollector({componentType:'SELECT_MENU', idle:IDLE_TIME_OF_INTERACTIONS})


  collector.on('collect', (interaction: Discord.SelectMenuInteraction) => {
    message.channel = interaction
    message.haveToUpdate = true
    message.lg = interaction.values[0] + "."
    user.lg = interaction.values[0] + "."
    message.reply(eval(getLoc)("language_edit"))
    user.save()
  })
  return true;
}
