import message from '../../class/message'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import Discord from 'discord.js'
import sleep from '../../genericFunctions/sleep'
import leaderboard from '../../class/types/leaderboard'

export default function seeLeaderboard(message: message, leaderboardInfo: leaderboard, page:number, userId: string, newEmbed:boolean){
  const {evName, evLvl, evClaim, evQuest, leaderboardType} = {...leaderboardInfo}
  let embed = new Discord.MessageEmbed(); //a new embed
  embed.addField("Leaderboard", evName.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE), true); //addField(name, value, inline);
  embed.addField("Level", evLvl.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE), true);
  leaderboardType == "claim" && embed.addField("Claims", evClaim.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE), true);
  leaderboardType == "quest" && embed.addField("Quests", evQuest.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE), true)
  const pagesEmbed = {page:page, message:message, leaderboard:leaderboardInfo, id:userId, totalPages:10}
  embed.setColor(0x35A7BF) //the color of the embed
  if(newEmbed){
    message.reply(embed).then(async function(discordMessage: Discord.Message){
      discordMessage.react("⬅️")
      await sleep(500)
      discordMessage.react("➡️")
      message.id = discordMessage.id
    });
    allPagesEmbed.set(pagesEmbed.id, pagesEmbed)
    setTimeout(() => {
      allPagesEmbed.delete(pagesEmbed.id)
    }, 1000*60*2)
  }
  else{
    message.edit(embed)
  }

}
