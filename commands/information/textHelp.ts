import message from '../../class/message'
import user from '../../class/user'
//import editPagesEmbed from './editPagesEmbed'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import {HELP_PAGE_NUMBER, IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'
import createSimpleEmbed from '../util/createSimpleEmbed'
import turnPage from '../util/turnPage'
import Discord from 'discord.js'

commandManager?.create({
  name:"help",
  type:"CHAT_INPUT",
  description:"see all available commands",
})

export default async function textHelp(message: message, user: user){
  message.addButton("pageLeft", "<<", "PRIMARY")
  message.addButton("pageRight", ">>", "PRIMARY")
  let page = 1
  message.embeds.push(getEmbed(page, user.lvl, message))
  const collector = (await message.reply()).createMessageComponentCollector({componentType:'BUTTON', idle:IDLE_TIME_OF_INTERACTIONS})

  collector.on('collect', (interaction: Discord.ButtonInteraction) => {
    if (interaction.user.id == user.id) {
      page = turnPage(interaction, page, HELP_PAGE_NUMBER)
      message.embeds[0] = getEmbed(page, user.lvl, message)
      interaction.update({embeds:[getEmbed(page, user.lvl, message)], content:" "})

	  }
    else {
		  interaction.reply({ content: `These buttons aren't for you!`, ephemeral: true });
	  }
  })
  return true
}


function getEmbed(page:number, lvl:number, message:message){
  let subpage = 1
  switch(page){
    case 4:
      if(lvl >= LEVEL_PERMISSIONS.collection) subpage = 2
      break
    case 5:
      if(lvl >= LEVEL_PERMISSIONS.upgrade) subpage = 2
      else if(lvl >= LEVEL_PERMISSIONS.recycle) subpage = 3
      else if(lvl >= LEVEL_PERMISSIONS.sortWaifu) subpage = 4
      break
    case 6:
      if(lvl >= LEVEL_PERMISSIONS.editname) subpage = 2
      break;
    case 7:
      if(lvl >= LEVEL_PERMISSIONS.createWaifu) subpage = 2
      else if(lvl >= LEVEL_PERMISSIONS.shop) subpage = 3
      else if(lvl >= LEVEL_PERMISSIONS.buy) subpage = 4
      break;
    case 9:
      if(lvl >= LEVEL_PERMISSIONS.deal) subpage = 2
      break
  }
  return createSimpleEmbed(page, HELP_PAGE_NUMBER, eval(getLoc)(`help_${page}_title`) ,eval(getLoc)(`help_${page}_description_${subpage}`))
}
