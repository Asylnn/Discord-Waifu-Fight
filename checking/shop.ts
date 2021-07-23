import message from '../class/message'

export default function checkShopAndUpdateQuests(message: message){

  if(day != (new Date()).getDate() || global.forceAuctionCompletion){
    global.forceAuctionCompletion = false
    if(global.globalAuction.higgestOffer.id != "-1"){
      users.get(global.globalAuction.higgestOffer.id).then(user => {
        const userMention = user.beMentionned ? guild.members.cache.get(user.id) : user.osuName
        user._money -= global.globalAuction.price
        message.reply(eval(getLoc)("won_auction")); userMention;
        user.save()
      })
    }
    global.globalAuction.item = getRandItem()
    global.globalAuction.price = 100
    global.globalAuction.higgestOffer = {username:eval(getLoc)("nobody"), id:"-1"}
  }
  /*if(day != (new Date()).getDate() || global.forceChallengeCompletion){
    global.forceChallengeCompletion = false
    global.dailyChallenge.lb.forEach(lb, type => {
      if(lb.size != 0){
        let highest = 0
        let highestIndex = ""
        lb.each((value, index) => {
          if(value >= highest){
            higest = value
            highestIndex = index
          }
        });
        let user = waifuserCol.get(highestIndex)
        let zaUser = user.beMentionned ? guild.members.cache.get(user.id) : user.osuName
        user.addItemTier(global.dailyChallenge.rewards[type])
        message.reply(eval(getLoc)("won_"+type+"_challenge"))
      }
    });
    global.dailyChallenge.lb = [new collection, new collection]
    global.dailyChallenge.rewards = [getRandItem(), getRandItem()]
  }*/
  day = (new Date()).getDate()
}


function getRandItem(){
  let item, isItemNotUsable
  do {
    item = items.random()
    isItemNotUsable = ["artifact", "par1", "par2", "consciousness_key", "perfect_circle", "dango"].includes(item.name) || item.tier > 1
  } while(isItemNotUsable)
  return item
}
