import message from '../../class/message'
import user from '../../class/user'
import createSimpleEmbed from '../util/createSimpleEmbed'
import templateDungeon from '../../class/types/templateDungeon'

commandManager.create({
  name:"dungeon",
  type:"CHAT_INPUT",
  description:"see all playable dungeons"
})

export default async function dungeon(message: message, user:user){


    const numberOfPages = Math.ceil(templateDungeons.size)
    let templateDungeonsArray: Array<templateDungeon> = []
    templateDungeons.forEach(templateDungeon => {
      templateDungeonsArray.push(templateDungeon)
    })
    message.createPageInteraction(numberOfPages, page => {
      const templateDungeon = templateDungeonsArray[page-1]
      const embed = createSimpleEmbed(eval(getLoc)(templateDungeon.name), eval(getLoc)(templateDungeon.description))
      let lastFloorCompleted = user.dungeonsPassedFloor[templateDungeon.id]
      if(!lastFloorCompleted) lastFloorCompleted = eval(getLoc)("never_did_dungeon")
      embed.addFields([{
        name:"ID",
        value:templateDungeon.id,
        inline:true
      },{
        name:eval(getLoc)("boss_resistances"),
        value:`${eval(getLoc)("phy")} : ${templateDungeon.bossRes.phy*100}\r\n ${eval(getLoc)("psy")} : ${templateDungeon.bossRes.psy*100}\r\n ${eval(getLoc)("mag")} : ${templateDungeon.bossRes.mag*100}\r\n`,
        inline:true
      },{
        name:eval(getLoc)("map_genre"),
        value:templateDungeon.mapGenre,
        inline:true
      },{
        name:eval(getLoc)("last_floor_completed"),
        value:lastFloorCompleted.toString(),
        inline:true
      },{
        name:"sets",
        value:eval(getLoc)(templateDungeon.sets),
        inline:true
      }])
      return embed
    })

  return true
}
