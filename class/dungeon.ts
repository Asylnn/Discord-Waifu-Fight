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
Rareté 3 : Très rare :    1600-1800   NivMax = 80    Niveau1 : 10-50  (-150pts) => (1350 - 1150)/79  => 17.09-14.56
DIFF 600
Rareté 2 : Rare :         900-1200    NivMax = 70    Niveau1 : 6-30  (-90pts)   => (1010 - 810)/69  =>  14.64-11.74
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

//import material from "./item/materials"
import waifuEquipment from "./item/waifuEquipment";
import user from "./user"
import waifu from "./waifu"
import gamemode from "./types/gamemode"
import randInt from '../genericFunctions/randInt'
import equipmentType from './types/equipmentType'
import {TIME_FIGHT, BOSS_HP_PER_STAGE, RARITIES_PER_STAGE, ATTACK_LINE_NUMBER_IN_EMBED, BEATMAP_HISTORY_SIZE, DUNGEON_DURATION_IN_SECONDS, INTERVAL_CHECK_IN_MILISECONDS, CRIT_DAMAGE_MULTIPLIER} from '../files/config.json'
import Discord from 'discord.js'
import {beatmap} from './types/beatmap'
import createSimpleEmbed from '../commands/util/createSimpleEmbed'
import globalMessage from './message'
import osuClaim from '../commands/osu/osuClaim'
import {milliToMinutes} from '../genericFunctions/timeConversion'

export default class dungeon {
  private timeRemaining = DUNGEON_DURATION_IN_SECONDS*1000
  private readonly name: string
  private readonly bossName: string
  private readonly stage: number
  private bossHP: number
  private readonly maxHP: number
  private readonly loots: Array<{
    "id":string
    "name":string
    "description":string
    "imgURL":string
    "type": equipmentType
    "set": string
  }>
  private readonly probabilityOfRarities: [number, number, number]
  private readonly bossRes: {phy:number, psy:number, mag:number}
  private readonly gamemode: gamemode
  private readonly ownerId: string
  private readonly ownerOsuId: number
  private readonly waifus: Array<[waifu, number]> = []
  private message: globalMessage //Quick fix for the ts error message is not defined in constructor (because probably assigned in a async function), should not stay like that
  private attackSentences: Array<string> = []
  private timers: Array<NodeJS.Timeout> = []
  private beatmap: beatmap = {id:0, beatmapSetId:0, genre:"anime", language:"japanese", mapGenre:"unknown"}
  private beatmaps: Array<beatmap>
  private lg: string
  private readonly mapGenre: string
  private mapTimestamp : number = Date.now()
  private recentMapsIds : number[]
  private confirmDeleteDungeon = false
  private buttonCollector: Discord.InteractionCollector<Discord.ButtonInteraction> = new Discord.InteractionCollector(discordClient)


  constructor(id: string, stage: number, gamemode : gamemode, starRating: number, user: user){
    //With the id of the dungeon, you get the name and the loots
    //With the stage of the dungeon, you get the baseBossHP and the probabilityOfRarities

    this.name = templateDungeons.get(id)!.name
    this.bossName = templateDungeons.get(id)!.bossName

    this.stage = stage
    this.beatmaps = templateDungeons.get(id)!.beatmaps[starRating]
    this.recentMapsIds = user.playedMapsIds
    this.mapGenre = templateDungeons.get(id)!.mapGenre

    this.bossHP = this.maxHP = BOSS_HP_PER_STAGE[stage - 1]
    this.loots = templateDungeons.get(id)!.items
    this.bossRes = templateDungeons.get(id)!.bossRes
    this.probabilityOfRarities = RARITIES_PER_STAGE[stage - 1] as [number, number, number]
    this.gamemode = gamemode
    this.ownerId = user.id
    this.ownerOsuId = user.osuId
    this.lg = user.lg
    const discordUser = discordClient.users.cache.get(this.ownerId)
    this.message = new globalMessage(this.lg, "", "DM", -1, discordUser, "-10", false)
    this.message.haveToUpdate = true



    user.waifus.forEach((waifu) => {
      if(waifu && !waifu.action){
        waifu.action = {createdTimestamp:0, timeWaiting:-1, type:"dungeon", lvl:1}
        this.waifus.push([waifu, waifu.phy*(100 - this.bossRes.phy) + waifu.psy*(100 - this.bossRes.psy) + waifu.mag*(100 - this.bossRes.mag)])
      }
    })

    this.timers.push(setInterval(() => {
      this.timeRemaining -= INTERVAL_CHECK_IN_MILISECONDS

      if(this.timeRemaining < 600){
        this.message.channel.send(eval(getLoc)('dungeon_10_minute_left'))
      }
      else if (this.timeRemaining <= 0) {
        this.message.channel.send(eval(getLoc)('dungeon_not_defeated'))
        this.delete()
      }
    }, INTERVAL_CHECK_IN_MILISECONDS));


    (() => {
      this.message.addButton("claim_map", eval(getLoc)("claim_map_button"), "SUCCESS")
      this.message.addButton("skip_map" ,eval(getLoc)("skip_map_button"),"SECONDARY")
      this.message.addButton("abandon_dungeon",eval(getLoc)("abandon_dungeon_button"),"DANGER")
      this.message.reply("creating dungeon...").then((message: Discord.Message) => {
        this.buttonCollector = message.createMessageComponentCollector({componentType:'BUTTON', idle:DUNGEON_DURATION_IN_SECONDS*1000})
        this.message.id = message.id
        this.getNewMap()

        this.buttonCollector.on('collect', async (interaction: Discord.ButtonInteraction) => {
          switch (interaction.customId){
            case "claim_map":
              user.playedMapsIds.unshift(this.beatmap.id)
              user.playedMapsIds.length = BEATMAP_HISTORY_SIZE
              const rawXP = await osuClaim(this.message, this.ownerOsuId, this.beatmap.id)
              if(!rawXP){const sentence = this.message.response.replace('\r\n', ''); this.message.response = ""; this.addSentence(sentence); return;}

              this.waifus.forEach(([waifu]) => {
                waifu.giveXP(rawXP/(this.waifus.length*3), this.message)
              })
              /*TODO : formule des dégats grace a  un claim de map*/
              let totalDamage = 0
              this.waifus.forEach(([waifu, damage]) => {
                const critMultiplier = 1 + waifu.critRate*1.5
                const speedMultiplier = 30000/waifu.attackSpeed
                totalDamage += critMultiplier*speedMultiplier*damage
              })

              totalDamage *= Math.floor(100*Math.sqrt(rawXP)/40)
              this.inflictDamage(totalDamage)

              this.addSentence(eval(getLoc)("claim_dungeon_attack"))

              this.getNewMap()
              break;
            case "skip_map":
              let timeLeft: string | number = TIME_FIGHT + this.mapTimestamp - Date.now()
              if(/*timeLeft <= 0*/true){
                this.getNewMap()
              }
              else {
                timeLeft = milliToMinutes(timeLeft as number)
                this.addSentence(eval(getLoc)("generated_map_earlier"))
              }
              break;
            case "abandon_dungeon":
              if(this.confirmDeleteDungeon){
                return this.delete()
              }
              this.addSentence(eval(getLoc)("delete_dungeon_confirmation"))
              this.confirmDeleteDungeon = true
              setTimeout(() => {
                this.confirmDeleteDungeon = false
              }, 10000)
              break;
            default:
              this.addSentence("I don't know how you did it but you found an hidden button!")
              break;
          }
        });

        this.waifus.forEach(([waifu, damage]) => {
          this.timers.push(setInterval(() => {
            const critMultiplier = randInt(100) + 1 > waifu.critRate ? 1 : CRIT_DAMAGE_MULTIPLIER
            const totalDamage = Math.floor(critMultiplier*damage*(0.9 + Math.random()*0.2))
            let mostImpactfulType = "phy"
            if (waifu.psy >= waifu.phy || waifu.mag >= waifu.phy){
              if (waifu.psy >= waifu.mag){
                mostImpactfulType = "psy"
              }
              else{
                mostImpactfulType = "mag"
              }
            }
            const possibleAttackSentences = eval(`${this.lg}attack_lines.${mostImpactfulType}`)
            const attackSentence = eval("`" + possibleAttackSentences[randInt(possibleAttackSentences.length)] + "`")
            this.inflictDamage(totalDamage)
            this.addSentence(attackSentence)



          }, waifu.attackSpeed))
        })



      })
    })()





  }

  inflictDamage(damage: number){
    this.bossHP -= damage
    if(this.bossHP <= 0){
      this.bossHP = 99999999999999 //used to avoid firing the function collectLoots two times if two waifu attacks at the same time
      this.collectLoots()
    }
  }

  addSentence(sentence: string){
    this.attackSentences.unshift(sentence)
    this.attackSentences.length = ATTACK_LINE_NUMBER_IN_EMBED
    this.updateEmbed()
  }

  getNewMap(){

    const mapPool = this.beatmaps

    let randIndex = randInt(this.beatmaps.length)
    this.beatmap = this.beatmaps[randIndex]
    while (mapPool.length > 1 && mapPool.includes(this.beatmap) && this.recentMapsIds.includes(this.beatmap.id)){
      mapPool.splice(randIndex, 1)
      randIndex = randInt(mapPool.length)
      this.beatmap = mapPool[randIndex]
    }

    this.updateEmbed()

  }

  updateEmbed(firstEmbed = false){


    const embed = createSimpleEmbed(`${eval(getLoc)(this.name)} ${this.stage}`, this.attackSentences.join("\r\n"))
    embed.addFields([{
      name:eval(getLoc)(this.bossName),
      value:`${this.bossHP}/${this.maxHP}`,
      inline:true
    }, {
      name:eval(getLoc)("boss_resistances"),
      value:`${eval(getLoc)("phy")} : ${this.bossRes.phy}\r\n ${eval(getLoc)("psy")} : ${this.bossRes.psy}\r\n ${eval(getLoc)("mag")} : ${this.bossRes.mag}\r\n`,
      inline:true
    }, {
      name:eval(getLoc)("time_left"),
      value:milliToMinutes(this.timeRemaining),
      inline:true
    }, {
      name:eval(getLoc)("dungeon_fight_map"),
      value:`https://osu.ppy.sh/beatmapsets/${this.beatmap.beatmapSetId}#${this.gamemode}/${this.beatmap.id}`,
      inline:true
    }])

    if(firstEmbed){

      this.message.channel.send({embeds:[embed]}).then((message: Discord.Message) => {
        this.message.id = message.id
      })
    }
    else{
      this.message.embeds[0] = embed
      this.message.reply()
    }
  }

  delete(){
    this.addSentence(eval(getLoc)("dungeon_close"))
    users.get(this.ownerId).then(user => {
      user.playedMapsIds = this.recentMapsIds
      user.isDoingDungeon = false
      user.waifus.forEach(waifu => {
        if(waifu?.action != null && waifu.action.type == "dungeon"){
          waifu.action = null
        }
      })
      user.save()
    })
    this.timers.forEach(timer => {
      clearInterval(timer)
    })
    this.buttonCollector.stop()
    dungeons.delete(this.ownerId)
  }

  collectLoots(){

    let numberOfEquipments = 5, itemRarity, equipments: Array<waifuEquipment> = []//Potentiellement genéré avec une formule dépendant du nb de claims? de la rapidité à finir le donjon?
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
      let equipment = this.loots[randInt(this.loots.length)]


      equipments.push(new waifuEquipment(equipment.id, equipment.name,  equipment.description, itemRarity, equipment.imgURL, equipment.type, equipment.set))
    }



    users.get(this.ownerId).then(async (user) => {

      console.log(equipments)
      user.items.waifuEquipment.push(...equipments)
      user.quests.updateQuest("finish_dungeon")
      /*

      user.items.materials.push ...

      */


      await user.save()
      this.delete()


    })
  }
}
