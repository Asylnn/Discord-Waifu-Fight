import message from '../../class/message'
import user from '../../class/user'
import whoTalks from './whoTalks'
import Discord from 'discord.js'
import deleteDeal from './deleteDeal'


export default async function refuse(message: message, user: user){
  if(await whoTalks(user.id) == "-1"){message.addResponse(eval(getLoc)("no_deal")); return true;}
  message.addResponse(eval(getLoc)("deal_refuse"))
  const deal = await deals.get(user.currentDealId)

  const dealDiscordUser = deal.turn == "0" ? discordClient.users.cache.get(deal.accepter.id) as Discord.User: discordClient.users.cache.get(deal.proposer.id) as Discord.User
  dealDiscordUser.send(eval(getLoc)("deal_refuse_opponant"))

  deleteDeal(deal)
}
