import deal from '../../class/types/deal'


export default async function deleteDeal(deal: deal){

  const dealAccepter = await users.get(deal.accepter.id)
  deals.del(dealAccepter.currentDealId)
  dealAccepter.currentDealId = "-1"

  const dealProposer = await users.get(deal.proposer.id)
  dealProposer.currentDealId = "-1"
}
