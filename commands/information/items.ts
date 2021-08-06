import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import seeItems from './seeItems'
import {MAJ} from '../../class/types/itemType'

export default async function items(message: message, user: user, args: Array<string>){
  const itemType: any = args[1]


  //itemType.replace("")
  //REALLY UGLY CODE
  if(!testArg(message, user, 0, "validItemType", itemType)) return true;
  //REALLY UGLY CODE

  seeItems(message, user.items[MAJ[itemType as 'material']], 1, user.id, true)

  return true
}
