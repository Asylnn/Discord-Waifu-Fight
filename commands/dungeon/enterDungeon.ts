//Création du donjon, fonction async
import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'

//J'imagine que args contiendra [0,A,B,C,D]
export default async function enterDungeon(message: message, user: user, args: Array<string>){

  //Ici les checks : si le donjon existe, si l'étage existe, si le star rating et le gamemode existe.
  let name = dungeonName.get(id) as string
  let baseBossHP = bossHPPerStage[stage - 1]
  let possibleLoots = possibleLootsPerDungeonId.get(id)
  let possibleRarities = raritiesPerStage[parseInt(stage) - 1]
  let dungeon = new dungeon(args[1], parseInt(args[2]), args[3], args[4])
  // Changer le booléen du user isUserDoingDungeon en true

}
