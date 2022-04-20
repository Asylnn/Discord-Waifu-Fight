import message from '../../class/message'
import user from '../../class/user'
import Discord from 'discord.js'
import createSimpleEmbed from '../util/createSimpleEmbed'
import {OBJECT_PER_PAGE} from '../../files/config.json'


commandManager?.create({
  name:"leaderboard",
  type:"CHAT_INPUT",
  description:"see the global leaderboard",
  options:[
    {
      name:"sort",
      description:"how do you want to sort the leaderboard (by default is by lvl)",
      required:false,
      type:"STRING",
      choices:[{name:"claim", value:"claim"},
        {name:"quest", value:"quest"},
        {name:"lvl", value:"lvl"}
      ],
    },
  ],
})

export default async function lb(message: message, args: Array<string>, interaction:Discord.CommandInteraction){
  let leaderboardType:string, evLvl: number[] = [], evName: string[] = [], evClaim: number[] = [], evQuest: number[] = [], detArray: any[]
  (await users.all()).forEach((user: user) => {
    evLvl.push(user.lvl) //and we only take their xp and lvl
    evName.push(user.osuName)
    evClaim.push(user.totalClaims)
    evQuest.push(user.quests.totalQuestDone)
  });
  leaderboardType = interaction.options?.getString("sort") || args[1]
  switch(leaderboardType){
    case "claim":
    case "claims":
      leaderboardType = "claim"
      detArray = JSON.parse(JSON.stringify(evClaim)) //Creating a deep copy
      break;
    case "quest":
    case "quests":
      leaderboardType = "quest"
      detArray = JSON.parse(JSON.stringify(evQuest))
      break;
    default:
      leaderboardType = "lvl"
      detArray = JSON.parse(JSON.stringify(evLvl))
      break;
  }

  for(var i = 0; i < detArray.length; i++){
    for(var j = i; j < detArray.length; j++){
      if(detArray[j] > detArray[i]){
        [detArray[i], detArray[j]] = [detArray[j], detArray[i]];
        [evLvl[i], evLvl[j]] = [evLvl[j], evLvl[i]];
        [evName[i], evName[j]] = [evName[j], evName[i]];
        [evClaim[i], evClaim[j]] = [evClaim[j], evClaim[i]];
        [evQuest[i], evQuest[j]] = [evQuest[j], evQuest[i]];
      }
    }
  }
  const numberOfPages = Math.ceil(detArray.length/OBJECT_PER_PAGE)

  message.createPageInteraction(numberOfPages, page => {
    const embed = createSimpleEmbed(eval(getLoc)('leaderboard_title'), " ")
    embed.addField("Leaderboard", evName.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE).join('\r\n'), true); //addField(name, value, inline);
    embed.addField("Level", evLvl.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE).join('\r\n'), true);
    if(leaderboardType == "claim") embed.addField("Claims", evClaim.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE).join("\r\n") , true);
    if(leaderboardType == "quest") embed.addField("Quests", evQuest.slice((page - 1)*OBJECT_PER_PAGE, page*OBJECT_PER_PAGE).join("\r\n"), true)
    return embed
  })

  return true
}
