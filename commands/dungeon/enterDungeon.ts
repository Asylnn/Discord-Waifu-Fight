//Création du donjon, fonction async
import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

const dungeonName = new Map<string, string>([
  ["1", "weapon_dungeon"],
  ["2", "accessory_dungeon"],
  ["3", "outfit_dungeon"]
])

const raritiesPerStage = new Array(Map<number,number>([
  [[1,70],[2,30]], //Etage 1
  [[1,50],[2,50]], //Etage 2
  [[1,30],[2,65],[3,5]], //Etage 3
  [[1,10],[2,75],[3,15]], //Etage 4
  [[2,65],[3,30],[4,5]], //Etage 5
  [[2,40],[3,55],[4,15]], //Etage 6
  [[2,20],[3,60],[4,20]], //Etage 7
  [[3,30],[4,65],[5,5]], //Etage 8
  [[3,10],[4,75],[5,15]], //Etage 9
  [[4,75],[5,25]] //Etage 10
]))

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
  
