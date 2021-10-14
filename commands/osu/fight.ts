import message from '../../class/message'
import user from '../../class/user'
import testWaifu from '../util/testWaifu'
import between from '../../genericFunctions/between'
import {milliToHours} from '../../genericFunctions/timeConversion'
import {TIME_FIGHT, BEATMAP_HISTORY_SIZE} from '../../files/config.json'
import randInt from '../../genericFunctions/randInt'
import gamemode from '../../class/types/gamemode'

async function getMap(gamemode: gamemode, star: number, playedMapsIds: Array<number>){
  let mapPool = await beatmaps.get(gamemode + star)
  let beatmap = mapPool ? mapPool[0] : null

  if (mapPool.length > 0){
    let index = randInt(mapPool.length)
    beatmap = mapPool[index]
    while (mapPool.length > 1 && playedMapsIds.includes(beatmap.id)){
      mapPool.splice(index, 1)
      index = randInt(mapPool.length)
      beatmap = mapPool[index]
    }
    if (mapPool.length == 1 && playedMapsIds.includes(beatmap.id)) {
      beatmap = null
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
  const waifu = testWaifu(message, user.waifus, waifuIndex)
  if(waifu != null){
    if(!waifu.testSendMesAction(message, "waifu_already_doing_action")){
      if(!between(star,0,11)){message.addResponse(eval(getLoc)("invalid_star")); return true;}
      if(user.fight.isInAFight){
        const timeLeft = milliToHours(user.fight.time + TIME_FIGHT - message.createdTimestamp); timeLeft
        if(user.fight.time + TIME_FIGHT >= message.createdTimestamp){message.addResponse(eval(getLoc)("already_in_fight")); return true;}
      }
      const beatmap = await getMap(gamemode, star, user.playedMapsIds)
      if(beatmap == null){message.addResponse(eval(getLoc)('did_all_maps'));return true;}
      const URL = `https://osu.ppy.sh/beatmapsets/${beatmap.beatmapSetId}#${gamemode}/${beatmap.id}`; URL
      user.fight = {isInAFight:true, beatmapId:beatmap.id, indexWaifu:waifuIndex, mode:gamemode, time:message.createdTimestamp}
      user.playedMapsIds.unshift(beatmap.id)
      user.playedMapsIds.length = BEATMAP_HISTORY_SIZE
      message.addResponse(eval(getLoc)("fight_map"))
    }
  }
}
