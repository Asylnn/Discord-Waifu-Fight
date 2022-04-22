import message from '../../class/message'
import user from '../../class/user'
import fruitsClaim from './fruitsClaim'
import maniaClaim from './maniaClaim'
import osuClaim from './osuClaim'
import taikoClaim from './taikoClaim'
import giveClaimXP from './giveClaimXP'
import Discord from 'discord.js'
import {mapGenre} from '../../class/types/beatmap'
import checkClicker from '../util/checkClicker'

import {BEATMAP_MAPPING_GENRE, IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'

commandManager?.create({
  name:"claim",
  type:"CHAT_INPUT",
  description:"claim the map you have done",
})

export default async function claim(message: message, user: user){
  if(!user.osuId/*user.osuId == 0 || user.osuId == undefined*/){message.addResponse(eval(getLoc)("no_osu_id")); return true;}
  if(!user.fight.isInAFight){message.addResponse(eval(getLoc)("claim_no_fight")); return true;}
  console.log("CLAIM // username : " + user.osuName)
  let rawXP: number
  switch(user.fight.mode){
    case "osu":
      rawXP = await osuClaim(message, user.osuId, user.fight.beatmapId)
      break;
    case "taiko":
      rawXP = await taikoClaim(message, user.osuId, user.fight.beatmapId)
      break;
    case "fruits":
      rawXP = await fruitsClaim(message, user.osuId, user.fight.beatmapId)
      break;
    case "mania":
      rawXP = await maniaClaim(message, user.osuId, user.fight.beatmapId)
      break;
  }
  giveClaimXP(message, user, rawXP)

  if(rawXP >= 1 && message.type != "osu"){


    const actionRow = new Discord.MessageActionRow()
    const selectMenu = new Discord.MessageSelectMenu()
    selectMenu.setCustomId('mapgenre')
    selectMenu.setPlaceholder('Select A Map Genre')
    const options: Array<Discord.MessageSelectOptionData> = BEATMAP_MAPPING_GENRE.map(mapGenre => {
      return {
        label:mapGenre,
        value:mapGenre
      }
    }).filter(option => option.label != "unknown")

    selectMenu.setOptions(options)
    actionRow.addComponents(selectMenu)
    message.components.push(actionRow)

    const collector = (await message.reply(eval(getLoc)("voting_explanation"))).createMessageComponentCollector({componentType:'SELECT_MENU', idle:IDLE_TIME_OF_INTERACTIONS})
    collector.on('collect', async (interaction: Discord.SelectMenuInteraction) => {
      message.channel = interaction
      message.haveToUpdate = true
      const beatmap = await beatmaps.get(user.fight.beatmapId.toString())
      beatmap.mapGenre = interaction.values[0] as mapGenre
      beatmap.mapGenreAuthor = user.id
      beatmaps.put(beatmap.id.toString(), beatmap)
      const reward = 1
      user.gachaCurrency = reward //<-----------------------------------
      if(checkClicker(interaction, user.id)) return true;
      collector.stop()
      user.save()
      message.reply(eval(getLoc)("thanks_for_voting")); reward;
    })
  }
}
