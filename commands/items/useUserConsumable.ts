import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

export default async function useUserConsumable(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)

  if(!testArg(message, user, itemIndex, "validItem" , "userconsumable")){return true;}
  const item = user.items.userConsumable[itemIndex].item
  const itemHasBeenUsed = item.use(message, user)
  if(itemHasBeenUsed){
    user.items.removeItem(item.id)
  }


}
