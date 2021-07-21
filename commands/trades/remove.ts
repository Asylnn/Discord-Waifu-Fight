import message from '../../class/message'
import user from '../../class/user'
import testUserDeal from './testUserDeal'

export default async function remove(message: message, user: user, args: Array<string>){
  if(!testUserDeal(user, message)) return true;
  let deal = await deals.get(user.currentDealId)
  const dealIndex = Math.floor(parseInt(args[1]) - 1)
  if(dealIndex < 1 || dealIndex > deal[deal.turn].length){message.reply(eval(getLoc)("deal_remove_invalid")); return true;}
  deal.valid = false
  deal[deal.turn].splice(dealIndex - 1, 1)
  message.reply(eval(getLoc)("deal_remove"))
}
