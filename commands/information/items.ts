import message from '../../class/message'
import user from '../../class/user'
import seeItems from './seeItems'
import {MAJ} from '../../class/types/itemType'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import testItemType from '../util/testItemType'
import createSimpleEmbed from '../util/createSimpleEmbed'

export default async function items(message: message, user: user, args: Array<string>){
  const itemType: string = args[1]
  if(!testItemType(message, itemType)) return true
  const items = user.items[MAJ[itemType as 'material']]
  const numberOfPages = Math.ceil(items.length/OBJECT_PER_PAGE)

  message.createPageInteraction(numberOfPages, page => {
    let content = ""
    for (var i = (page - 1)*OBJECT_PER_PAGE; i < Math.min(page*OBJECT_PER_PAGE, items.length); i++){
      const {item, qty} = {...items[i]}
      content += `${i+1}: (x${qty}) ${eval(getLoc)(item.name) + "★".repeat(item.rarity)} | ${eval(getLoc)(item.description)} \r\n`
    }
    return createSimpleEmbed(page, numberOfPages, 'items_title', content+" ")
  })
  seeItems(message, items, 1, user.id, true)

  return true
}
