import message from '../../class/message'
import user from '../../class/user'
import whoTalks from './whoTalks'
import seeDeal from './seeDeal'

export default async function seedeal(message: message, user: user){
  if(await whoTalks(user.id) == "-1"){message.reply(eval(getLoc)("no_deal")); return true;}
  let deal = await deals.get(user.currentDealId)
  message.reply(seeDeal(deal, message))
}
