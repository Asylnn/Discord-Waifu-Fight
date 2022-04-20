import message from '../../class/message'
import user from '../../class/user'
import deleteDeal from './deleteDeal'
import testUserDeal from './testUserDeal'
import {deepCopy} from '../../genericFunctions/copy'
import {MAJ} from '../../class/types/itemType'



export default async function accept(message: message, user: user){
  if(!await testUserDeal(user, message)) return true;
  const deal = await deals.get(user.currentDealId)
  const proposer = await users.get(deal.proposer.id)
  const accepter = await users.get(deal.accepter.id)

  if(!deal.valid){message.addResponse(eval(getLoc)("deal_not_valid")); return true;}
  deal["0"].forEach((object) => { //First it's the proposer that gives items to the accepter
    switch(object.type){
      case "waifu":
        const waifu = deepCopy(deal.proposer.waifus[object.reference]!)
        waifu.owner = accepter
        deal.accepter.reserveWaifu.push(waifu)
        deal.proposer.waifus.splice(object.reference)
        break;
      case "reservewaifu":
        const reserveWaifu = deepCopy(deal.proposer.reserveWaifu[object.reference])
        reserveWaifu.owner = accepter
        deal.accepter.reserveWaifu.push(reserveWaifu)
        deal.proposer.reserveWaifu.splice(object.reference)
        break;
      case 'userconsumable':
      case 'waifuconsumable':
      case 'userequipment':
      case 'waifuequipment':
      case 'material':
        const item = deepCopy(deal.proposer.items[MAJ[object.type]][object.reference].item)
        deal.accepter.items.addItem(item, object.complement as number)
        deal.proposer.items.removeItem(item, object.complement as number)
        break;
      case "yens":
        deal.accepter._money += 1*object.reference
        deal.proposer._money -= 1*object.reference
    }
  });
  deal["1"].forEach((object) => {
    switch(object.type){
      case "waifu":
        const waifu = deepCopy(deal.accepter.waifus[object.reference]!)
        waifu.owner = proposer
        deal.proposer.reserveWaifu.push(waifu)
        deal.accepter.waifus.splice(object.reference)
        break;
      case "reservewaifu":
        const reserveWaifu = deepCopy(deal.accepter.reserveWaifu[object.reference])
        reserveWaifu.owner = proposer
        deal.proposer.reserveWaifu.push(reserveWaifu)
        deal.accepter.reserveWaifu.splice(object.reference)
        break;
      case 'userconsumable':
      case 'waifuconsumable':
      case 'userequipment':
      case 'waifuequipment':
      case 'material':
        const item = deepCopy(deal.proposer.items[MAJ[object.type]][object.reference].item)
        deal.proposer.items.addItem(item, object.complement as number)
        deal.accepter.items.removeItem(item, object.complement as number)
        break;
      case "yens":
        deal.proposer._money += 1*object.reference
        deal.accepter._money -= 1*object.reference
    }
  });
  let dealDiscordUser = deal.turn == "0" ? discordClient.users.cache.get(deal.accepter.id) as any : discordClient.users.cache.get(deal.proposer.id) as any
  deleteDeal(deal)
  message.addResponse(eval(getLoc)("deal_accepted"))
  dealDiscordUser.send(eval(getLoc)("deal_accepted"))
}
