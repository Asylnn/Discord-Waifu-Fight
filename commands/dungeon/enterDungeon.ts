import message from '../../class/message'
import user from '../../class/user'
import dungeonClass from '../../class/dungeon'
import gamemode from '../../class/types/gamemode'
import between from '../../genericFunctions/between'
import Discord from 'discord.js'
/*o!enterdungeon A B C D(raccourci o!ed)
A = numéro donjon (un des id pris à partir de showAllDungeons)
B = l'étage du donjon
C = star rating
D = gamemode (optionnel)
*/


const dungeonsIds: {name:string, value:string}[] = []
templateDungeons.forEach((dungeon) => {
  dungeonsIds.push({name:dungeon.id, value:dungeon.id})
})

commandManager.create({
  name:"enter",
  type:"CHAT_INPUT",
  description:"Enter a dungeon",
  options:[
    {
      name:"dg",
      description:"the dungeon",
      required:true,
      type:"STRING",
      choices:dungeonsIds,
    },{
      name:"floor",
      description:"floor of dungeon",
      required:true,
      type:"INTEGER"
    },{
      name:"sr",
      description:"star rating",
      required:true,
      type:"INTEGER"
    },{
      name:"mode",
      description:"the gamemode of the proposed map",
      required:false,
      type:"STRING",
      choices:[{name:"consumableuser", value:"consumableuser"},
      {name:"consumablewaifu", value:"consumablewaifu"},
      {name:"equipmentuser", value:"equipmentuser"},
      {name:"equipmentwaifu", value:"equipmentwaifu"},
      {name:"material", value:"material"}],
    }
  ],
})


export default async function enterDungeon(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){

  const dungeonId = message.isInteraction ? interaction.options.getString('dg')! : args[1]
  const stage = message.isInteraction ? interaction.options.getInteger('floor')! : Math.floor(+args[2])
  const sr = message.isInteraction ? interaction.options.getInteger('sr')! : Math.floor(+args[3])
  let mode = message.isInteraction ? interaction.options.getString('mode') : args[4]

  if(user.isDoingDungeon){message.addResponse(eval(getLoc)("already_in_dungeon")); return true;}

  if(!templateDungeons.has(dungeonId)){message.addResponse(eval(getLoc)("dungeon_does_not_exitst")); return true;}
  if(!between(stage, 1, 10)){message.addResponse(eval(getLoc)("invalid_stage")); return true;}
  if(!between(sr, 0, 11)){message.addResponse(eval(getLoc)("invalid_star")); return true;}


  if(!mode || !["osu", "mania", "taiko", "fruits"].includes(mode)){
    mode = user.gamemode
  }


  let dungeon = new dungeonClass(dungeonId, stage, mode as gamemode, sr, user)
  console.log(eval(getLoc)("check_dm"))
  message.addResponse(eval(getLoc)("check_dm"))
  dungeons.set(user.id, dungeon)
  user.isDoingDungeon = true
}

  //message.addResponse("Il s'agirait d'arrêter de mettre des nombres au pif dans la commande.")
