import message from '../../class/message'
import editPagesEmbed from './editPagesEmbed'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import {HELP_PAGE_NUMBER} from '../../files/config.json'

export default function seeItems(message: message, pagesEmbedObject:{userLvl:number}, page: number, id: string, newEmbed: boolean){
  let subpage = 1, lvl = pagesEmbedObject.userLvl
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
  editPagesEmbed(eval(getLoc)(`help_${page}_description_${subpage}`), newEmbed, {page:page, message:message, help:pagesEmbedObject, id:id, totalPages:HELP_PAGE_NUMBER})
}
