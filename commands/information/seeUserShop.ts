import message from '../../class/message'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import editPagesEmbed from './editPagesEmbed'


export default function seeUserShop(message: message, page: number, id: string, newEmbed: boolean){
  let content = ""
  for (var i = (page - 1)*OBJECT_PER_PAGE; i < page*OBJECT_PER_PAGE && i < userShop.length; i++){
    let deal = userShop[i]
    //let box_xp = 0
    if(deal.object.objectType == 'item'){
      content += `${i + 1}: ${eval(getLoc)(deal.object.name) + "★".repeat(deal.object.tier)} | ${eval(getLoc)("price")} : ${deal.price} | ${deal.proposer.username} \r\n`
    }
    else{
      let waifu = waifus.get(deal.object.id)
      if(!waifu) return;

      content += `${i + 1}: ${waifu.name} LV: ${deal.object.lvl} | ${eval(getLoc)("price")} : ${deal.price} | ${deal.proposer.username} \r\n`
    }
  }
  editPagesEmbed(content, newEmbed, {page: page, message:message, id:id, totalPages:Math.ceil(userShop.length/OBJECT_PER_PAGE), otherType:'userShop'})
}
