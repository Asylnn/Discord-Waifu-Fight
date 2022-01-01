import message from '../../class/message'
import createSimpleEmbed from '../util/createSimpleEmbed'
import templateDungeon from '../../class/types/templateDungeon'

commandManager.create({
  name:"dungeon",
  type:"CHAT_INPUT",
  description:"see all dungeons"
})

export default async function dungeon(message: message){


    const numberOfPages = Math.ceil(templateDungeons.size)
    let templateDungeonsArray: Array<templateDungeon> = []
    templateDungeons.forEach(templateDungeon => {
      templateDungeonsArray.push(templateDungeon)
    })
    message.createPageInteraction(numberOfPages, page => {
      const templateDungeon = templateDungeonsArray[page-1]
      const embed = createSimpleEmbed(eval(getLoc)(templateDungeon.name), eval(getLoc)(templateDungeon.description))
      embed.addFields([{
        name:"ID",
        value:templateDungeon.id,
        inline:true
      },{
        name:eval(getLoc)("boss_resistances"),
        value:`${eval(getLoc)("phy")} : ${templateDungeon.bossRes.phy}\r\n ${eval(getLoc)("psy")} : ${templateDungeon.bossRes.psy}\r\n ${eval(getLoc)("mag")} : ${templateDungeon.bossRes.mag}\r\n`,
        inline:true
      },{
        name:eval(getLoc)("map_genre"),
        value:templateDungeon.mapGenre,
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
