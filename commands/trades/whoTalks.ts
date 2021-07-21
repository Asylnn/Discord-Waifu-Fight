export default async function whoTalks(id: string){
  let whoTalks = "-1";
  (await deals.all()).forEach(deal =>{
    if(deal.proposer.id == id){
      whoTalks = "0"
    }
    else if(deal.accepter.id == id){
      whoTalks = "1"
    }
  });
  return whoTalks
}
