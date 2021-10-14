import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS} from '../../files/config.json'

export default async function sortWaifu(message: message, user: user, args: Array<string>){
  if(user.lvl < LEVEL_PERMISSIONS.sortWaifu){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}
  if(!["int", "luck", "ex", "lvl", "stars", "rarity","name"].includes(args[1])){message.addResponse(eval(getLoc)("sort_waifu_missing_argument")); return true;}
  switch(args[1]){
    case "name":
      user.reserveWaifu.sort((waifuA, waifuB) =>{
        if(waifuA.name < waifuB.name) { return 1; }
        if(waifuA.name > waifuB.name) { return -1; }
        return 0;
      });
      break;
    case "rarity":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.rarity - waifuB.rarity) //for everyuser
      break;
    case "stars":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.stars - waifuB.stars)
      break;
    case "lvl":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.lvl - waifuB.lvl)
      break;
    case "int":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.int - waifuB.int)
      break;
    case "luck":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.luck - waifuB.luck)
      break;
  }
  message.addResponse(eval(getLoc)("waifus_sorted"))
}
