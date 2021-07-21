import message from '../../class/message'
import user from '../../class/user'
import seelb from './seelb'
import leaderboardType from '../../class/types/leaderboardType'

export default async function lb(message: message, user: user, args: Array<string>){
  let leaderboardType:leaderboardType, evLvl: number[] = [], evName: string[] = [], evClaim: number[] = [], evQuest: number[] = [], detArray: any[]
  (await users.all()).forEach((user: user) => {
    evLvl.push(user.lvl) //and we only take their xp and lvl
    evName.push(user.osuName)
    evClaim.push(user.totalClaims)
    evQuest.push(user.quests.totalQuestDone)
  });
  switch(args[1]){
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
        console.log(detArray[i]);
        console.log(detArray[j]);

        [detArray[i], detArray[j]] = [detArray[j], detArray[i]];

        console.log(detArray[i]);
        console.log(detArray[j]);
        [evLvl[i], evLvl[j]] = [evLvl[j], evLvl[i]];
        [evName[i], evName[j]] = [evName[j], evName[i]];
        [evClaim[i], evClaim[j]] = [evClaim[j], evClaim[i]];
        [evQuest[i], evQuest[j]] = [evQuest[j], evQuest[i]];
      }
    }
  }
  seelb(message, {evName, evLvl, evClaim, evQuest, leaderboardType}, 1, user.id, true)

  return true
}
