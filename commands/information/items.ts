import message from '../../class/message'
import user from '../../class/user'
import seeItems from './seeItems'
import {MAJ} from '../../class/types/itemType'
import testItem from '../util/testItem'
import testItemType from '../util/testItemType'

export default async function items(message: message, user: user, args: Array<string>){
  const itemType: any = args[1]


  if(!testItemType(message, itemType)){return true}
  const items = user.items[MAJ[itemType as 'material']]
  if(!testItem(message, items, itemType)){return true;}

  seeItems(message, items, 1, user.id, true)

  return true
}
