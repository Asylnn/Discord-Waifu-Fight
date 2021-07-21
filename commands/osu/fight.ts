import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
import between from '../../genericFunctions/between'
import {milliToHours} from '../../genericFunctions/timeConversion'
import {TIME_FIGHT, BEATMAP_HISTORY_SIZE} from '../../files/config.json'
import randInt from '../../genericFunctions/randInt'
import gamemode from '../../class/types/gamemode'

async function getMap(gamemode: gamemode, star: number, playedMapsIds: Array<number>){
  let mapPool = beatmapIds[gamemode][star]
  let beatmap: [number, number] = mapPool[0] ||[0, 0]

  if (mapPool.length > 0){
    let index = randInt(mapPool.length)
    beatmap = mapPool[index]
    while (mapPool.length > 1 && playedMapsIds.includes(beatmap[1])){
      mapPool.splice(index, 1)
      index = randInt(mapPool.length)
      beatmap = mapPool[index]
    }
    if (mapPool.length == 1 && playedMapsIds.includes(beatmap[1])) {
      beatmap = [0, 0]
    }
  }
  return beatmap
}


export default async function fight(message: message, user: user, args:Array<string>){
  let gamemode: gamemode, waifuIndex: number, star: number, a = 1
  if (!["mania","osu","taiko","fruits"].includes(args[1])){
    gamemode = user.gamemode
  }
  else {
    a = 2
    gamemode = args[1] as gamemode
  }

  waifuIndex = Math.floor(parseInt(args[a]) - 1)
  star = Math.floor(parseInt(args[1 + a]))

  if(testArg(message, user, waifuIndex, "validWaifu")){
    const waifu = user.waifus[waifuIndex]
    if(!waifu.testSendMesAction(message, "waifu_already_doing_action")){
      if(!between(star,0,11)){message.reply(eval(getLoc)("invalid_star")); return true;}
      if(user.fight.isInAFight){
        const timeLeft = milliToHours(user.fight.time + TIME_FIGHT - message.createdTimestamp); timeLeft
        if(user.fight.time + TIME_FIGHT >= message.createdTimestamp){message.reply(eval(getLoc)("already_in_fight")); return true;}
      }
      const beatmap = await getMap(gamemode, star, user.playedMapsIds)
      if(beatmap[0] == 0){message.reply(eval(getLoc)('did_all_maps'));return true;}
      const URL = `https://osu.ppy.sh/beatmapsets/${beatmap[0]}#osu/${beatmap[1]}`; URL
      user.fight = {isInAFight:true, beatmapId:beatmap[1], indexWaifu:waifuIndex, mode:gamemode, time:message.createdTimestamp}
      user.playedMapsIds.unshift(beatmap[1])
      user.playedMapsIds.length = BEATMAP_HISTORY_SIZE
      message.reply(eval(getLoc)("fight_map"))
    }
  }
}
