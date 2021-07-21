import Discord from 'discord.js'
import seeReserve from './information/seeReserve'
import seeItems from './information/seeItems'
import seeLeaderboard from './information/seelb'
import seeHelp from './information/seeHelp'
import seeUserShop from './information/seeUserShop'

export default async function messageReaction(reaction:Discord.MessageReaction, userId:string){
  allPagesEmbed.forEach(pageEmbed => {
    reaction.users.remove(userId)
    if(pageEmbed.id != userId || pageEmbed.message.id != reaction.message.id){return;}
    reaction.emoji.name == "⬅️" ? pageEmbed.page-- : pageEmbed.page++
    if(pageEmbed.page == pageEmbed.totalPages + 1){pageEmbed.page = 1}
    else if(pageEmbed.page == 0){pageEmbed.page = pageEmbed.totalPages}


    if(pageEmbed.waifus){
      seeReserve(pageEmbed.message, pageEmbed.waifus, pageEmbed.page, userId, false)
    }
    else if(pageEmbed.items){
      seeItems(pageEmbed.message, pageEmbed.items, pageEmbed.page, userId, false)
    }
    else if(pageEmbed.leaderboard){
      seeLeaderboard(pageEmbed.message, pageEmbed.leaderboard, pageEmbed.page, userId, false)
    }
    else if(pageEmbed.help){
      seeHelp(pageEmbed.message, pageEmbed.help, pageEmbed.page, userId, false)
    }
    else if(pageEmbed.otherType == "userShop"){
      seeUserShop(pageEmbed.message, pageEmbed.page, userId, false)
    }
  });
}
