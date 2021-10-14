import message from '../../class/message'
import user from '../../class/user'
import seeDeal from './seeDeal'
import testUserDeal from './testUserDeal'
import {copyInstance} from '../../genericFunctions/copy'


export default async function sendterms(message: message, user: user){
  if(!testUserDeal(user, message)){return true;}
  message.addResponse(eval(getLoc)("deal_send_terms"))
  const deal = await deals.get(user.currentDealId)
  const dealUser = deal.turn == '0' ? discordClient.users.cache.get(deal.accepter.id) : discordClient.users.cache.get(deal.proposer.id)
  const userMessage = copyInstance(message)
  if(!dealUser){message.addResponse("fatal error (well not fatal but pretty bad) couldn't find your trade partener on the discord cache"); return true}
  userMessage.lg = (await users.get(dealUser.id)).lg
  dealUser.send(eval(getLoc)("opponant_finished"))
  deal.turn = deal.turn == "0" ? "1" : "0"
  deal.valid = deal["0"].length != 0 && deal["1"].length != 0 ? true : false
  dealUser.send(seeDeal(deal, userMessage))
}
