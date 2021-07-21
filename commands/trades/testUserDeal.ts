import message from '../../class/message'
import user from '../../class/user'
import whoTalks from './whoTalks'

export default async function testUserDeal(user: user ,message: message){
  const whoTalk = await whoTalks(user.id)

  if(whoTalk == "-1"){
    message.reply(eval(getLoc)("no_deal"))
    return false
  }
  let deal = await deals.get(user.currentDealId)
  if(whoTalk != deal.turn){
    message.reply(eval(getLoc)("wrong_turn"))
    return false
  }
  return true
}
