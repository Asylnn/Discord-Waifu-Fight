//Création du donjon, fonction async
import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'





//Dictionnaire des loots pour les donjons d'équipements
//Clé : id du donjon
//Valeur : Tableau des equipmentWaifu
const possibleLootsPerDungeonId = new Map<string,Array<equipmentWaifu> | Array<materials>>([
  ["1", [arme_princesse,tenue_princesse,accessoire_princesse,arme_tsundere,tenue_tsundere,accessoire_tsundere]]
   ])

const bossHPPerStage = new Array(100,1000,10000,100000,1000000,10000000,100000000,1000000000,10000000000,100000000000) // Valeur des 10 étages
/*o!enterDungeon A B C D(raccourci o!ed)
A = numéro donjon (un des id pris à partir de showAllDungeons)
B = l'étage du donjon
C = gamemode (optionnel)
D = star rating (optionnel)
*/
//J'imagine que args contiendra [A,B,C,D]
export default async function enterDungeon(message: message, user: user, args: Array<string>){

  //Ici les checks : si le donjon existe, si l'étage existe, si le star rating et le gamemode existe.
  let id = args[0]
  let name = dungeonName.get(id) as string
  let stage = args[1]
  let baseBossHP = bossHPPerStage[stage - 1]
  let possibleLoots = possibleLootsPerDungeonId.get(id)
  let possibleRarities = raritiesPerStage[parseInt(stage) - 1]
  let gamemode = args[2]
  let starRating = args[3]
  let dungeon = new dungeon(id, name, parseInt(stage), baseBossHP, possibleLoots, possibleRarities, gamemode, starRating)
  // Changer le booléen du user isUserDoingDungeon en true

}
