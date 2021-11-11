import message from '../../class/message'
import user from '../../class/user'
import whoTalks from './whoTalks'
import {LEVEL_PERMISSIONS} from '../../files/config.json'


export default async function startDeal(message: message, user: user, discordMessage: any){

  if(user.lvl < LEVEL_PERMISSIONS.deal){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  if(await whoTalks(user.id) != "-1"){message.addResponse(eval(getLoc)("in_deal")); return true;}
  if(!discordMessage.mentions.users.firstKey()){message.addResponse(eval(getLoc)("mention_deal")); return true;}
  if(!(await users.exists(discordMessage.mentions.users.first().id))){message.addResponse(eval(getLoc)("arg_no_account")); return true;}

  const accepterId = discordMessage.mentions.users.first().id
  if(await whoTalks(accepterId) != "-1"){message.addResponse(eval(getLoc)("mentionned_already_in_deal")); return true;}

  const accepter = await users.get(accepterId)
  if(accepter.lvl < LEVEL_PERMISSIONS.deal){message.addResponse(eval(getLoc)("deal_lvl_too_low")); return true;}


  deals.put(dealIdGenerator.toString(), {turn:"0", proposer: user, accepter:accepter, '0':[], '1':[], valid:false})
  accepter.currentDealId = dealIdGenerator.toString()
  user.currentDealId = dealIdGenerator.toString()
  dealIdGenerator++
  message.addResponse(eval(getLoc)("start_deal"))
  discordMessage.mentions.users.first().send(eval(getLoc)("start_deal_pm"))
}
