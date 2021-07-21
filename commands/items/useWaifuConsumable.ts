import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

export default async function useWaifuConsumable(message: message, user: user, args: Array<string>){
  const itemIndex = Math.floor(parseInt(args[1]) - 1)
  const waifuIndex = Math.floor(parseInt(args[2]) - 1)

  if(!testArg(message, user, itemIndex, "validItem", "waifuconsumable")){return true;}
  const item = user.items.waifuConsumable[itemIndex].item
  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;}
  const itemHasBeenUsed = item.use(message, user, waifuIndex)

  if(itemHasBeenUsed)
    user.items.removeItem(item.id)
}
