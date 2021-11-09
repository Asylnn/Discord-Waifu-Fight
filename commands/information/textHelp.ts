import message from '../../class/message'
import user from '../../class/user'
//import editPagesEmbed from './editPagesEmbed'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import {HELP_PAGE_NUMBER, IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'
import createSimpleEmbed from '../util/createSimpleEmbed'
import turnPage from '../util/turnPage'
import Discord from 'discord.js'
import checkClicker from '../util/checkClicker'



commandManager?.create({
  name:"help",
  type:"CHAT_INPUT",
  description:"see all available commands",
})

export default async function textHelp(message: message, user: user){

  message.createPageInteraction(HELP_PAGE_NUMBER, page => {
    let subpage = 1
    switch(page){
      case 4:
        if(user.lvl >= LEVEL_PERMISSIONS.collection) subpage = 2
        break
      case 5:
        if(user.lvl >= LEVEL_PERMISSIONS.upgrade) subpage = 2
        else if(user.lvl >= LEVEL_PERMISSIONS.recycle) subpage = 3
        else if(user.lvl >= LEVEL_PERMISSIONS.sortWaifu) subpage = 4
        break
      case 6:
        if(user.lvl >= LEVEL_PERMISSIONS.editname) subpage = 2
        break;
      case 7:
        if(user.lvl >= LEVEL_PERMISSIONS.createWaifu) subpage = 2
        else if(user.lvl >= LEVEL_PERMISSIONS.shop) subpage = 3
        else if(user.lvl >= LEVEL_PERMISSIONS.buy) subpage = 4
        break;
      case 9:
        if(user.lvl >= LEVEL_PERMISSIONS.deal) subpage = 2
        break
    }
    return createSimpleEmbed(page, HELP_PAGE_NUMBER, `help_${page}_title` ,eval(getLoc)(`help_${page}_description_${subpage}`))
  })
  return true
}
