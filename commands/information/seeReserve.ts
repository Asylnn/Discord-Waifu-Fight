import message from '../../class/message'
import waifu from '../../class/waifu'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import editPagesEmbed from './editPagesEmbed'

export default function seeReserve(message: message, waifus: Array<waifu>, page: number, userId: string, newEmbed:boolean){
  let content = ""
  for (var i = (page - 1)*OBJECT_PER_PAGE; i < page*OBJECT_PER_PAGE && i < waifus.length; i++) {

    let lvl = "LV " + waifus[i].lvl
    let star = "★".repeat(waifus[i].stars)
    content += `${i+1}: ${waifus[i].name}${star} ${lvl} ${waifus[i].rarityName(message)}\r\n`
  }
  editPagesEmbed(content, newEmbed, {page:page, message:message, waifus:waifus, id:userId, totalPages:Math.ceil(waifus.length/OBJECT_PER_PAGE)})
}
