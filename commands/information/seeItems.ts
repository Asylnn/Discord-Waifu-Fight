import message from '../../class/message'
import item from '../../class/item'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import editPagesEmbed from './editPagesEmbed'


export default function seeItems(message: message, sortedItems: Array<{item:item, qty:number}>, page: number, id: string, newEmbed: boolean){
  let content = ""
  for (var i = (page - 1)*OBJECT_PER_PAGE; i < page*OBJECT_PER_PAGE && i < sortedItems.length; i++){
    const itemAndQty = sortedItems[i]
    let box_xp = 0
    if(item.name.startsWith("xp_box")){box_xp = itemAndQty.item.effects[0].value}
    content += `${i+1}: (x${itemAndQty.qty}) ${eval(getLoc)(itemAndQty.item.name) + "★".repeat(itemAndQty.item.tier)} | ${eval(getLoc)(itemAndQty.item.description)} \r\n`; box_xp;
  }
  editPagesEmbed(content, newEmbed, {page:page, message:message, items:sortedItems, id:id, totalPages:Math.ceil(sortedItems.length/OBJECT_PER_PAGE)})
}
