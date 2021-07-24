/*
o!showAllDungeons
Affiche tous les donjons avec leur numéro assigné
o!enterDungeon A B C D(raccourci o!ed)
A = numéro donjon (arme, accessoire ou tenue)
B = l'étage du donjon
C = gamemode (optionnel)
D = star rating (optionnel)
(peut se faire avec o!enterDungeon puis une réaction sur un embed)
o!submitScore(raccourci o!ss)
Submit le score.

---------------------OLD---------------------
Un combat contre un boss tour par tour
Chaque tour ta/tes waifu(s) attaque avec ses dégats et tu peux faire des dégats en plus si tu envoie un score de la map proposée (a la meme manière qu'un osu!br : si une map
dure 3min tu as genre 4min pour envoyer un score pour éviter le retry)
Comme c'est pas obligatoire si tu as pas osu d'allumé, tu feras uniquement les dégats de la/des waifu(s)
On stockera le star rating des maps proposées (1*, 2* etc) et le mode de jeu par défaut sera utilisé. (peut etre demandé aussi le mode de jeu)
Ajouter une commande pour skip le temps de watching du score si t sur de pas en envoyer 1.
Chaque waifu équipée va pouvoir taper 3 fois.
Le boss aura de plus en plus de vie en fonction du niveau du donjon.
1er tour : Le boss apparait, il a les pv du niveau du donjon en question.
Le boss te propose de participer au combat en finissant une map qu'il donnera lui-même.
Au bout du temps imparti ou après la commande skip, tes waifus (+ toi) attaquent le boss (maybe une stat de coup critique pour faire genre 1.5x les dégats d'attaque?) une fois en même temps.
Le boss perd les pv correspondants.
2ème tour : Si le boss est mort, les loots sont générés (loots augmentent en fonction du nombre de tours mis avant de le tuer?)
Si il est encore vivant, il te propose une autre map.
Au bout du temps imparti ou après la commande skip, tes waifus (+ toi) attaquent le boss une fois en même temps.
Le boss perd les pv correspondants.
3ème tour : Si le boss est mort, les loots sont générés
Si il est encore vivant, il te propose une autre map.
Au bout du temps imparti ou après la commande skip, tes waifus (+ toi) attaquent le boss une fois en même temps.
Le boss perd les pv correspondants.
A la fin du 3ème tour : Si tu as tué le boss, les loots sont générés.
Sinon, c'est la défaite.

----------------------NEW------------------------------------

Un donjon est ouvert durant 1 heure
Le boss du donjon apparait avec sa barre de vie (selon étage du donjon)
Le but est de le tuer avant le temps fatidique.
On stockera le star rating des maps proposées (1*, 2* etc) et le mode de jeu par défaut sera utilisé. (peut etre demandé aussi le mode de jeu)
Un donjon permettra de farmer 2 emsembles entiers.
Les waifus équipées du user vont l'accompagner à l'intérieur, elles taperont de base toutes les 30 secondes avec une puissance correspondant à leur stat d'attaque et leur type d'attaque.
Ce montant est réduit par l'agilité (AGI) jusqu'à un minimum de 10 secondes.
Le boss possède une faiblesse à un type, une résistance à un autre et est neutre au reste.
On peut aussi faire un score sur la map proposée par le boss pour que l'utilisateur aide ses waifus au combat.
Si un score est envoyé et validé, une autre map sera disponible pour refaire un score.
Au début du combat, la stat de coup critique pour chaque waifu sera affichée, elle dépendra en partie de la LUCK.
Si les waifus arrivent à tuer le boss, elles récupèrent le loot.
Si le temps est écoulé, les waifus repartent bredouille. (Avec des baka)
*/



const dungeonName = new Map<string, string>([
  ["1", "weapon_dungeon"],
  ["2", "accessory_dungeon"],
  ["3", "outfit_dungeon"]
])


import equipmentWaifu from "./item/equipmentWaifu";
import message from "./message"
import materials from "./item/materials"
import gamemode from "./types/gamemode"
type stageType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export default class dungeon {
  createdTimestamp: number
  id: string
  name: string
  stage: stageType
  baseBossHP: number
  //isUserDoingDungeon: boolean         a mettre dans user
  possibleLoots: Array<equipmentWaifu> | materials //Soit un donjon a loot d'équipement soit le donjon pour farm la ressource pour upgrade les équipements
  gamemode: gamemode
  starRating: number

  constructor(id: string, stage: stageType, gamemode : gamemode, starRating: number){
    this.createdTimestamp = Date.now()
    this.id = id
    this.stage = stage
    this.name = dungeonName.get(id) as string
    this.gamemode = gamemode
    this.starRating = starRating
    this.baseBossHP = this.stage*100
  }



}
