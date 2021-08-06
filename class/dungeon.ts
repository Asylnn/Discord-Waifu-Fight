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

Il faut certainement créer des variables globales au projet entier pour les informations "hard-coded qui pourraient changer" tels que :
- Le temps d'un donjon
- La valeur d'un coup critique
}
*/

import equipmentWaifu from "./item/equipmentWaifu";
import material from "./item/materials"
import user from "./user"
import waifu from "./waifu"
import gamemode from "./types/gamemode"
import randInt from '../genericFunctions/randInt'
import equipmentType from './types/equipmentType'
import {ATTACK_LINE_NUMBER_IN_EMBED} from '../files/config.json'
import Discord from 'discord.js'
import beatmap from './types/beatmap'

const dungeonMap: {[key:string]: {
  name: string
  description: string
  items: Array<[string, string, string, string, equipmentType, string]>
  bossRes: [number, number, number]
  mapGenre:string
  beatmaps: Array<beatmap>
}} = {
  "1": {
    name: "princess_dungeon",
    description : "princess_description",
    items:[["id", "name", "desc", "img", "outfit", "set"]],
    bossRes:[10,10,10],
    mapGenre:"osu-stream",
    beatmaps:[]
  }
}

const bossHPPerStage = new Array(100,1000,10000,100000,1000000,10000000,100000000,1000000000,10000000000,100000000000) // Valeur des 10 étages
const raritiesPerStage : Array<[number, number, number]> = Array(
  [1, 70, 30], //Etage 1
  [1, 50, 50], //Etage 2
  [1, 30, 65], //Etage 3
  [1, 10, 75], //Etage 4
  [2, 65, 30], //Etage 5
  [2, 40, 55], //Etage 6
  [2, 20, 60], //Etage 7
  [3, 30, 65], //Etage 8
  [3, 10, 75], //Etage 9
  [3, 0, 75] //Etage 10
)




const dungeonDurationInSeconds = 3600
const intervalChecksInMilliseconds = 10000
const critDamageMultiplier = 1.5

export default class dungeon {
  private timeRemaining = dungeonDurationInSeconds / 10
  private readonly id: string
  private readonly name: string
  private readonly stage: number
  private bossHP: number //Vie actuelle
  private readonly loots: Array<[string, string, string, string, equipmentType, string]> //Soit la liste des équipements des 2 sets et la ressource pour monter de niveau les équipements (dans une autre variable)
  private readonly probabilityOfRarities: [number, number, number] // Tableau de 3 nombres
  private readonly bossRes: [number, number, number]
  private readonly gamemode: gamemode
  private readonly starRating: number
  private readonly ownerId: string
  private readonly ownerOsuId: number
  private readonly waifus: Array<[waifu, number]> = []
  private message: Discord.Message = "" as unknown as Discord.Message //Quick fix for the ts error message is not defined in constructor (because probably assigned in a async function), should not stay like that
  private visibleAttackSentences: Array<string> = []
  private timers: Array<NodeJS.Timeout> = []
  private beatmap: beatmap = {id:0, beatmapSetId:0, genre:"no_genre", language:"japanese", mapGenre:"unknown"}
  private beatmaps: Array<beatmap>
  private lg: string
  private readonly mapGenre:string



  constructor(id: string, stage: number, gamemode : gamemode, starRating: number, user: user){
    //With the id of the dungeon, you get the name and the loots
    //With the stage of the dungeon, you get the baseBossHP and the probabilityOfRarities

    this.id = id
    this.name = dungeonMap[id].name
    this.stage = stage
    this.beatmaps = dungeonMap[id].beatmaps
    this.mapGenre = dungeonMap[id].mapGenre
    this.getNewMap()
    this.bossHP = bossHPPerStage[stage - 1]
    this.loots = dungeonMap[id].items
    this.bossRes = dungeonMap[id].bossRes
    this.probabilityOfRarities = raritiesPerStage[stage - 1]
    this.gamemode = gamemode
    this.starRating = starRating
    this.ownerId = user.id
    this.ownerOsuId = user.osuId
    this.lg = user.lg

    user.waifus.forEach((waifu) => {
      if(waifu)
      this.waifus.push([waifu, waifu.phy*(100 - this.bossRes[0]) + waifu.psy*(100 - this.bossRes[1]) + waifu.mag*(100 - this.bossRes[2])])
    })




    discordClient.users.fetch(this.ownerId).then(user => {
      const embed = new Discord.MessageEmbed()
      const message = {lg:this.lg}; message;
      embed.setColor(0x35A7BF)
      embed.setTitle(`${eval(getLoc)(this.name)} ${this.stage}`)
      const URL = `https://osu.ppy.sh/beatmapsets/${this.beatmap.beatmapSetId}#${this.gamemode}/${this.beatmap.id}`; URL
      embed.setDescription(eval(getLoc)("fight_map"))
      embed.addField("still don't know", "")
      user.send(embed).then((message) => {
        this.message = message
      })
    })

    this.waifus.forEach(waifuAndDamage => {
      const waifu = waifuAndDamage[0]
      const damage = waifuAndDamage[1]

      this.timers.push(setInterval(() => {
        const critMultiplier = randInt(100) + 1 > waifu.critRate ? 1 : critDamageMultiplier
        const totalDamage = Math.floor(critMultiplier*damage*(0.9 + Math.random()*0.2))
        this.bossHP -= totalDamage
        let mostImpactfulType = "phy"
        if (waifu.psy >= waifu.phy || waifu.mag >= waifu.phy){
          if (waifu.psy >= waifu.mag){
            mostImpactfulType = "psy"
          }
          else{
            mostImpactfulType = "mag"
          }
        }
        const possibleAttackSentences = eval(`${this.lg}attackSentences.${mostImpactfulType}.${critMultiplier == 1 ? "normal" : "crit"}`)
        const attackSentence = eval("`" + possibleAttackSentences[randInt(possibleAttackSentences.length)] + "`")
        //const attackSentence = eval("`" + eval(`${lg}attackSentences.${critMultiplier == 1 ? "normal" : "crit"}_${mostImpactfulType}_${randInt(eval(`${lg}attackSentences.length`))}`) + "`")

        this.editEmbed(attackSentence)

        if(this.bossHP <= 0){
          this.bossHP = 99999999999999 //used to avoid firing the function collectLoots two times if two waifu attacks at the same time
          this.collectLoots()
        }

      }, waifu.attackSpeed))

    })

    this.timers.push(setInterval(() => {
      this.timeRemaining --

      if(this.timeRemaining < 600){
        this.message.channel.send(eval(this.lg + 'dungeon_10_minute_left'))
      }
      else if (this.timeRemaining <= 0) {
        this.message.channel.send(eval(this.lg + 'dungeon_not_defeated'))
        this.delete()
      }
    }, intervalChecksInMilliseconds))

  }

  claim(){
    const message = {lg:this.lg}; message;
    osuAPI.getUserScores({userId: this.ownerOsuId, type:"recent", gamemode:"osu", limit:10}).then(scores => {
      console.log("user found! : " + this.ownerOsuId)
      const score = scores.find(score => score.beatmap.id == this.beatmap.id)
      if(!score){this.message.reply(eval(getLoc)("beatmap_not_done")); return;}

      //Some stuff
      const attackMultiplier = 100
      let totalDamage = 0
      this.waifus.forEach(waifuAndDamage => {
        const waifu = waifuAndDamage[0]
        const damage = waifuAndDamage[1]
        const critMultiplier = 1 + waifu.critRate*1.5
        const speedMultiplier = 30/waifu.attackSpeed
        totalDamage += critMultiplier*speedMultiplier*damage
      })
      totalDamage *= attackMultiplier
      this.bossHP -= totalDamage
      const URL = `https://osu.ppy.sh/beatmapsets/${this.beatmap.beatmapSetId}#${this.gamemode}/${this.beatmap.id}`; URL
      this.editEmbed(eval(getLoc)("claim_dungeon_attack"), eval(getLoc)("fight_map")); totalDamage;
      this.getNewMap()
    })
  }

  getNewMap(){
    beatmaps.get(this.gamemode + this.starRating).then(dbBeatmaps =>  {
      const possibleMaps = dbBeatmaps.filter(beatmap => beatmap.genre == this.mapGenre).concat(this.beatmaps)
      this.beatmap = possibleMaps[randInt(possibleMaps.length)]
    })
  }

  editEmbed(attackSentence:string, mapURL = ""){
    this.visibleAttackSentences.unshift(attackSentence)
    this.visibleAttackSentences.length = ATTACK_LINE_NUMBER_IN_EMBED
    const embed = this.message.embeds[0]
    const attackLines = this.visibleAttackSentences.join('\r\n')
    embed.setDescription(attackLines)
    if(mapURL){

    }
    embed.fields[0] = {name: "still don't know", value: attackLines, inline:false}
    this.message.edit(embed).then((message) => {
      this.message = message
    })
  }

  delete(){
    this.timers.forEach(timer => {
      clearInterval(timer)
    })
    dungeons.delete(this.ownerId)
  }

  collectLoots(){
    let numberOfEquipments = 5, itemRarity, equipments: Array<equipmentWaifu> = []//Potentiellement genéré avec une formule dépendant du nb de claims? de la rapidité à finir le donjon?
    for(var i = 0; i < numberOfEquipments; i++){
      const rand = randInt(100)
      if(rand - this.probabilityOfRarities[1] < 0){
        itemRarity = this.probabilityOfRarities[0]
      }
      else if (rand - this.probabilityOfRarities[1] - this.probabilityOfRarities[2] < 0){
        itemRarity = this.probabilityOfRarities[0] + 1
      }
      else{
        itemRarity = this.probabilityOfRarities[0] + 2
      }
      let whichEquipment = this.loots[randInt(this.loots.length)]

      equipments.push(new equipmentWaifu(whichEquipment[0], whichEquipment[1],  whichEquipment[2], itemRarity, whichEquipment[3], whichEquipment[4], whichEquipment[5]))

    }
    users.get(this.ownerId).then((user ) => {
      user.items.equipmentWaifu.push(...equipments)
      /*

      user.items.materials.push ...

      */
      user.save()
      this.delete()
    })
  }
}
