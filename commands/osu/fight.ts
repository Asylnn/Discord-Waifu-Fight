import message from '../../class/message'
import user from '../../class/user'
import between from '../../genericFunctions/between'
import {milliToMinutes} from '../../genericFunctions/timeConversion'
import {TIME_FIGHT, BEATMAP_HISTORY_SIZE, TEST_BUILD} from '../../files/config.json'
import randInt from '../../genericFunctions/randInt'
import gamemode from '../../class/types/gamemode'
import getParameterObject from '../util/getParameterObject'
import Discord from 'discord.js'

commandManager?.create({
  name:"fight",
  type:"CHAT_INPUT",
  description:"fight a beatmap (whatever that means :thinking:)",
  options:[{
    name:"sr",
    description:"the star rating of the maps you want to play",
    required:true,
    type:"NUMBER"
  },{
    name:"mode",
    description:"the gamemode of the proposed map",
    required:false,
    type:"STRING",
    choices:[{name:"standard", value:"osu"},
    {name:"catch", value:"fruits"},
    {name:"mania", value:"mania"},
    {name:"taiko", value:"taiko"},],
  },{
    name:"w",
    description:"waifu slot -- Which waifu will be fighting with you (no input will open select menu)",
    required:false,
    type:"INTEGER"
  }],
})


async function getMap(gamemode: gamemode, star: number, playedMapsIds: Array<number>){
  let mapPool = await beatmaps.filter(beatmap => {console.log(beatmap); return beatmap.gamemode == gamemode && Math.floor(beatmap.starRating) == star})
  console.log(mapPool)
  let beatmap = mapPool.length != 0 ? mapPool[0].id : null

  if (mapPool.length > 0){
    let index = randInt(mapPool.length)
    beatmap = mapPool[index].id
    while (mapPool.length > 1 && playedMapsIds.includes(beatmap)){
      mapPool.splice(index, 1)
      index = randInt(mapPool.length)
      beatmap = mapPool[index].id
    }
    if (mapPool.length == 1 && playedMapsIds.includes(beatmap) && !TEST_BUILD) {
      beatmap = null
    }
  }
  return beatmap
}


export default async function fight(message: message, user: user, args:Array<string>, interaction: Discord.CommandInteraction){
  let gamemode: gamemode, waifuIndex: number, star: number, a = 1


  if(!message.isInteraction){
    if (!["mania","osu","taiko","fruits"].includes(args[1])){
      gamemode = user.gamemode
    }
    else {
      a = 2
      gamemode = args[1] as gamemode
    }
    star = Math.floor(parseInt(args[1 + a]))
  }
  else {
    gamemode = interaction.options.getString('mode') ? interaction.options.getString('mode')! as gamemode : user.gamemode
    star = interaction.options.getNumber('sr')!
  }

  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu) return true
  waifuIndex = message.isInteraction ? waifu.owner!.waifus.findIndex(userWaifu => userWaifu?.id == waifu.id) : Math.floor(parseInt(args[a]) -1)

  if(!waifu.testSendMesAction(message, "waifu_already_doing_action")){
    if(!between(star,0,11)){message.addResponse(eval(getLoc)("invalid_star")); return true;}
    if(user.fight.isInAFight){
      const timeLeft = milliToMinutes(user.fight.time + TIME_FIGHT - message.createdTimestamp); timeLeft
      if(user.fight.time + TIME_FIGHT >= message.createdTimestamp){message.addResponse(eval(getLoc)("already_in_fight")); return true;}
    }
    const beatmapId = await getMap(gamemode, star, user.playedMapsIds)
    if(beatmapId == null){message.addResponse(eval(getLoc)('did_all_maps'));return true;}
    const beatmap = await beatmaps.get(beatmapId.toString())
    const URL = `https://osu.ppy.sh/beatmapsets/${beatmap.beatmapSetId}#${gamemode}/${beatmap.id}`; URL
    user.fight = {isInAFight:true, beatmapId:beatmap.id, indexWaifu:waifuIndex, mode:gamemode, time:message.createdTimestamp}
    user.playedMapsIds.unshift(beatmap.id)
    user.playedMapsIds.length = BEATMAP_HISTORY_SIZE
    message.addResponse(eval(getLoc)("fight_map"))
  }
}
