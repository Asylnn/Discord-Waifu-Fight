/*

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
Le boss possède des faiblesses et des résistances.
On peut aussi faire un score sur la map proposée par le boss pour que l'utilisateur aide ses waifus au combat.
Si un score est envoyé et validé, une autre map sera disponible pour refaire un score.
Au début du combat, la stat de coup critique pour chaque waifu sera affichée, elle dépendra en partie de la dextérité.
Si les waifus arrivent à tuer le boss, elles récupèrent le loot. La stat de chance affectera les loots
Si le temps est écoulé, les waifus repartent bredouille. (Avec des baka)

o!showAllDungeons
Affiche tous les donjons avec leur numéro assigné
o!enterDungeon A B C D(raccourci o!ed)
A = numéro donjon (un des id pris à partir de showAllDungeons)
B = l'étage du donjon
C = gamemode (optionnel)
D = star rating (optionnel)
(peut se faire avec o!enterDungeon puis une réaction sur un embed)
o!submitScore(raccourci o!ss)
Submit le score.


Changement sur user

avoir une variable defaultStarRating en plus de defaultGamemode

Changement sur waifu

Ajout de la stat Kawaii
Ajout de la stat Dextérité
Ajout de la stat Force
La variable EX devient (dans le fr.json) la stat Agilité

Déletion de la stat EX
Déletion de la stat INT
Rebalance de toutes les valeurs (potentiellement scale de 20 a 1000)

AGI monte a 500   1:2
LUCK monte a 100  1:10
INT monte a 1000
STG monte a 1000
KAW monte a 1000
DEXT monte a 500  1:2

(100%)
(65%)
(65%)
(30%)
(20%)
(20%)

65%* 650 < 800

1000+700+700+400+200+200=3000

On confirme que le niveau max (pour le moment) est considéré à 100.
Chaque rareté a une somme de points égale à un certain nombre au niveau 100.
Rareté 5 : Légendaire :   3000-3200   NivMax = 100   Niveau1 : 20-100 (-300pts) => (2900 - 2700)/99  => 29.29-27.27
DIFF 800                  ()
Rareté 4 : Épique :       2200-2400   NivMax = 90    Niveau1 : 15-73  (-220pts) => (1980 - 1780)/89  => 22.45-20.00
DIFF 700
Rareté 3 : Très rare :    1500-1700   NivMax = 80    Niveau1 : 10-50  (-150pts) => (1350 - 1150)/79  => 17.09-14.56
DIFF 600
Rareté 2 : Rare :         900-1100    NivMax = 70    Niveau1 : 6-30  (-90pts)   => (1010 - 810)/69  =>  14.64-11.74
DIFF 500
Rareté 1 : Commune :      400-600     NivMax = 60    Niveau1 : 3-13 (-40pts)    => (560 - 360)/59   =>  9.49-6.10

BossHP

1 : 2 commune level 20              (+0%)   70% R1 30% R2
2 : 1 rare 2 commune level 20       (+0%)   50% R1 50% R2
3 : 2 rares 1 commune level 30      (+20%)  30% R1 65% R2 5% R3
4 : 3 rares level 40                (+40%)  10% R1 75% R2 15% R3
5 : 1 très rare 2 rares level 45    (+60%)  65% R2 30% R3 5% R4
6 : 3 très rares level 60           (+90%)  40% R2 55% R3 15% R4
7 : 2 épique 1 très rare level 70   (+125%) 20% R2 60% R3 20% R4
8 : 3 épiques level 80              (+160%) 30% R3 65% R4 5% R5
9 : 1 légendaire 2 épiques level 90 (+200%) 10% R3 75% R4 15% R5
10 : 3 légendaire level 100         (+250%) 75% R4 25% R5

10 sets = 30 equipement
30 équipements "90% parfait" = 100 équipement légendaires x 30 = 3000 *0.66 = 2000 donjons

}
*/



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
                                   
const bossHPPerStage = new Array(100,1000,10000,100000,1000000,10000000,100000000,1000000000,10000000000,100000000000) // Valeur des 10 étages

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
  possibleLoots: Array<equipmentWaifu> | Array<materials> //Soit la liste des équipements des 2 sets soit la ressource pour monter de niveau les équipements
  possibleRarities: Map<number,number> // Dictionnaire avec en clé la rareté (1 à 5) et en valeur le pourcentage de chances pour la rareté en question
  gamemode: gamemode
  starRating: number

  constructor(id: string, name: string, stage: stageType, baseBossHP: number, possibleLoots: Array<equipmentWaifu> | Array<materials>, 
               possibleRarities: Map<number,number>, gamemode : gamemode, starRating: number){
    this.createdTimestamp = Date.now()
    this.id = id
    this.name = name
    this.stage = stage
    this.baseBossHP = baseBossHP
    this.possibleLoots = possibleLoots
    this.possibleRarities = possibleRarities
    this.gamemode = gamemode
    this.starRating = starRating
  }



}
