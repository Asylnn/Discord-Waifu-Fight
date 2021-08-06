import message from '../../class/message'
import user from '../../class/user'
import dungeonClass from '../../class/dungeon'
import gamemode from '../../class/types/gamemode'
import between from '../../genericFunctions/between'

/*o!enterdungeon A B C D(raccourci o!ed)
A = numéro donjon (un des id pris à partir de showAllDungeons)
B = l'étage du donjon
C = star rating
D = gamemode (optionnel)
*/

export default async function enterDungeon(message: message, user: user, args: Array<string>){

  //Check if dungeon exists, if stage is valid and if SR is valid
  if(!dungeons.has(args[1])){message.reply(eval(getLoc)("dungeon_do_not_exist")); return;}
  if(between(+args[2], 1, 10)){message.reply(eval(getLoc)("invalid_stage")); return;}
  if(between(+args[3], 0, 11)){message.reply(eval(getLoc)("invalid_star")); return;}
  let gamemode = "osu"
  const starRating = Math.floor(+args[4])
  if(!["osu", "mania", "taiko", "fruits"].includes(args[4])){
    gamemode = user.gamemode
  }
  else {
    gamemode = args[4]
  }

  let dungeon = new dungeonClass(args[1], +args[2], gamemode as gamemode, starRating, user)
  dungeons.set(user.id, dungeon)
  user.isDoingDungeon = true
}

  //message.reply("Il s'agirait d'arrêter de mettre des nombres au pif dans la commande.")  
