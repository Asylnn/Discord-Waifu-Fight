/*
Ce mini-jeu à l'air pour le moment élitiste en terme de ranking osu!, il faut donc faire en sorte que
les plus débutants puisse quand meme y participer un minimum =
- Accompagnement du user par une waifu / l'équipe active de waifus.
- Refaire le système d'items (Item en classe abstraite). //Fait

Ca se présente comme ca (exemple type):
Couronne de lauriers ***** level 15/60
URL de l'image
Stat principale : Niveau de box + 1
Sub stat 1 : Chance de drop de box + 15%
Sub stat 2 : 20% de l'exp du claim est réparti entre les autres waifus équipées
Sub stat 3 : INT + 12
Sub stat 4 : Gain de yens + 7%
Sub stat 5 : LUCK + 10

L'XP d'un équipement n'augmentera pas à chaque claim, il faudrait manuellement les améliorer avec des matériaux et une quantité de yen.
Ils seront revendables selon leur rareté et leur level actuel en échange de yen.
Toutes les pièces d'équipement actuelles et futures devront avoir un set (correspondre a un ensemble)
Avoir 2 ou 3 pièces du même set donnera un buff unique au set en question
Ex : Ensemble de magicienne : Tenue de magicienne avec ses stats dont la stat fixe générée aléatoirement
                              Arme de magicienne avec ses stats dont la stat fixe générée aléatoirement
                              Lunette de magicienne avec la stat fixe égale au modificateur de la lunette (Réduction temps des analyses)

Pour les items avec un nom qui pourrait poser problème : "Écrits de vigenère de magicienne" => "Écrits vigenèriens de magicienne"

Faire plusieurs "donjons" pour pas chopper tous les sets au même endroit.
Potentiellement certains sets farmable un certain nombre de fois par heure? jour? semaine? waifu? possibilité d'acheter des runs de donjons avec des yens
si les runs sont toutes consommées?

Nouvelle stats? : Chance de double claims, Augmentation XP pour X mode, Augmentation XP pour tous les modes,
Augmentation XP si le claim contient X mod (HD, HR, DT...), Augmentation XP pour l'équipe entière / soi-même,
Chance de drop de box, Augmentation de LUCK, Augmentation du niveau des loots de o!box (Level de parchemin recu, yens recus, xp pure recue),
Capacité de multiexp et/ou de xp share (La waifu gagne 100% ou moins du montant du claim et les autres waifus se partagent un montant du claim ou le reste du claim)
Réduction temps exploration/decryptage/analyse

(Certains de ces effets peuvent être utilisés comme bonus de tenue et serait non disponibles pour les rolls et procs des equipements)
Maybe forcer en sub stat fixe la valeur actuelle des accessoires (lunette : reduction temps analyse, pluck : +50% all modes etc...)

Maybe certaines stats seraient reservés à un slot de waifu active?
Potentiellement stats disponibles uniquement sur un type d'équipement (épée : XP, bottes : EX etc...)



- Mini event : multi osu VS entre la personne et un de nous (Asyln & QuentinFTW)

TODO : Tableaux des montants de génération/augmentation

*/

//Object{"weapon"} clé : equipmentWaifu.type valeur : Array<Array<[string, number, number]> x 5>
/*"weapon" : Array(//Liste des modificateurs
["add_luck",[]]
//Pour aller chercher le tableau pour augmenter la mainStat add_luck d'un equipement de rareté 2 -> [10, 2]
weapon.add_luck.rarity[2].mainStat <- [10, 2] -> +2 +2 +2 +3 +3 +3 +4 +4 +5 +6 +8 +10 +15
weapon.add_luck.rarity.statSecondaire <- tableau avec la fourchette [valeur_min,différence_avec_valeur_max]


)
*/





import modificator from "../modificator";
import randInt from '../../genericFunctions/randInt'
import Message from '../../class/message'
import item from './item'
import equipmentType from '../types/equipmentType'
import modificatorType from '../types/modificatorType'
import {MAX_PROCS} from '../../files/config.json'
import createSimpleEmbed from '../../commands/util/createSimpleEmbed'

const procsPerPiece: {
  "generic":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "weapon":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "outfit":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "accessory":Array</*rarity*/Array<[modificatorType, number, number]>>
} = {
  "generic": [/*Rareté 1*/[["mult_stg",0.01,0.02],["mult_int",0.01,0.02],["mult_kaw",0.01,0.02],["mult_agi",0.01,0.02],["mult_dext",0.01,0.02],["mult_luck",0.01,0.02],["mult_XP",0.03,0.03]],
              /*Rareté 2*/[["mult_stg",0.02,0.02],["mult_int",0.02,0.02],["mult_kaw",0.02,0.02],["mult_agi",0.02,0.02],["mult_dext",0.02,0.02],["mult_luck",0.02,0.02],["mult_XP",0.05,0.03]],
              /*Rareté 3*/[["mult_stg",0.03,0.03],["mult_int",0.03,0.03],["mult_kaw",0.03,0.03],["mult_agi",0.03,0.03],["mult_dext",0.03,0.03],["mult_luck",0.03,0.03],["mult_XP",0.07,0.04]],
              /*Rareté 4*/[["mult_stg",0.05,0.04],["mult_int",0.05,0.04],["mult_kaw",0.05,0.04],["mult_agi",0.05,0.04],["mult_dext",0.05,0.04],["mult_luck",0.05,0.04],["mult_XP",0.09,0.06]],
              /*Rareté 5*/[["mult_stg",0.06,0.05],["mult_int",0.06,0.05],["mult_kaw",0.06,0.05],["mult_agi",0.06,0.05],["mult_dext",0.06,0.05],["mult_luck",0.06,0.05],["mult_XP",0.11,0.07]]
             ],
  "weapon": [   [["mult_phy", 0.015,0.01],["mult_psy", 0.015,0.02],["mult_mag", 0.015,0.01]],
                [["mult_phy", 0.03,0.02],["mult_psy", 0.03,0.02],["mult_mag", 0.03,0.02]],
                [["mult_phy", 0.05,0.04],["mult_psy", 0.05,0.02],["mult_mag", 0.05,0.04]],
                [["mult_phy", 0.07,0.06],["mult_psy", 0.07,0.02],["mult_mag", 0.07,0.06]],
                [["mult_phy", 0.1,0.08],["mult_psy", 0.1,0.02],["mult_mag", 0.1,0.08]]
  ],
  "outfit": [   [["exploration_capability", 0.015,0.01],["cafe_capability", 0.015,0.02],["mining_capability", 0.015,0.01]],
                [["exploration_capability", 0.03,0.02],["cafe_capability", 0.03,0.02],["mining_capability", 0.03,0.02]],
                [["exploration_capability", 0.05,0.04],["cafe_capability", 0.05,0.02],["mining_capability", 0.05,0.04]],
                [["exploration_capability", 0.07,0.06],["cafe_capability", 0.07,0.02],["mining_capability", 0.07,0.06]],
                [["exploration_capability", 0.1,0.08],["cafe_capability", 0.1,0.02],["mining_capability", 0.1,0.08]]
              ],
  "accessory":[ [["reduce_action_time", 0.01, 0.01] , ["mult_XP_std", 0.05, 0.02], ["mult_XP_catch", 0.05, 0.02], ["mult_XP_taiko", 0.05, 0.02], ["mult_XP_mania", 0.05, 0.02]],
                [["reduce_action_time", 0.02, 0.02] , ["mult_XP_std", 0.08, 0.04], ["mult_XP_catch", 0.08, 0.04], ["mult_XP_taiko", 0.08, 0.04], ["mult_XP_mania", 0.08, 0.04]],
                [["reduce_action_time", 0.03, 0.02] , ["mult_XP_std", 0.1, 0.06], ["mult_XP_catch", 0.1, 0.06], ["mult_XP_taiko", 0.1, 0.06], ["mult_XP_mania", 0.1, 0.06]],
                [["reduce_action_time", 0.04, 0.03] , ["mult_XP_std", 0.12, 0.08], ["mult_XP_catch", 0.12, 0.08], ["mult_XP_taiko",  0.12, 0.08], ["mult_XP_mania", 0.12, 0.08]],
                [["reduce_action_time", 0.05, 0.04] , ["mult_XP_std", 0.15, 0.1], ["mult_XP_catch", 0.15, 0.1], ["mult_XP_taiko", 0.15, 0.1], ["mult_XP_mania", 0.15, 0.1]]]
}

const mainStatPerPiece: {
  "weapon":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "outfit":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "accessory":Array</*rarity*/Array<[modificatorType, number, number]>>
} = {
  "weapon": [/*Rareté 1*/[["mult_stg",0.01,0.01],["mult_int",0.01,0.01],["mult_kaw",0.01,0.01]],
              /*Rareté 2*/[["mult_stg",0.02,0.013],["mult_int",0.02,0.013],["mult_kaw",0.02,0.013]],
              /*Rareté 3*/[["mult_stg",0.03,0.015],["mult_int",0.03,0.015],["mult_kaw",0.03,0.015]],
              /*Rareté 4*/[["mult_stg",0.05,0.019],["mult_int",0.05,0.019],["mult_kaw",0.05,0.019]],
              /*Rareté 5*/[["mult_stg",0.06,0.023],["mult_int",0.06,0.023],["mult_kaw",0.06,0.023]]
             ],
  "outfit": [/*Rareté 1*/[["mult_agi",0.01,0.01],["mult_dext",0.01,0.01]],
              /*Rareté 2*/[["mult_agi",0.02,0.013],["mult_dext",0.02,0.013]],
              /*Rareté 3*/[["mult_agi",0.03,0.015],["mult_dext",0.03,0.015]],
              /*Rareté 4*/[["mult_agi",0.05,0.019],["mult_dext",0.05,0.019]],
              /*Rareté 5*/[["mult_agi",0.06,0.023],["mult_dext",0.06,0.023]]
             ],
  "accessory": [/*Rareté 1*/[["mult_luck",0.01,0.01],["mult_XP",0.03,0.03]],
              /*Rareté 2*/[["mult_luck",0.02,0.013],["mult_XP",0.05,0.03]],
              /*Rareté 3*/[["mult_luck",0.03,0.015],["mult_XP",0.07,0.04]],
              /*Rareté 4*/[["mult_luck",0.05,0.019],["mult_XP",0.09,0.06]],
              /*Rareté 5*/[["mult_luck",0.06,0.023],["mult_XP",0.11,0.07]]
             ],
}

export default class waifuEquipment extends item {
  public readonly objectType = "waifuEquipment"
  public lvl = 1
  public xp = 0
  public readonly type: equipmentType // Helmet,chestplate,boots ...
  public readonly set: string// Maybe add a class for the set of equipment for different checks
  public modificators: Array<modificator>//The list of modificators

  constructor(id: string, name: string, description:string, rarity: number, img:string, type: equipmentType, set: string){
    //Générer valeur

    super(id, name, description, rarity, rarity*100, img, false)


    this.type = type
    this.set = set
    this.modificators = []

    if(!id) return; /*When getting user from database, everything is a plain JS object (not a class),
    so you must do something like Object.assign(new object(), object_from_database) to transform it to a class.
    when doing this every parameters of the constructor is undefined.*/


    const modificatorInfo = mainStatPerPiece[this.type][rarity - 1][randInt(mainStatPerPiece[this.type][rarity - 1].length)]
    this.modificators.push(new modificator(`${this.type}_${this.rarity}_${modificatorInfo[0]}`, modificatorInfo[0], 1 + modificatorInfo[1], [modificatorInfo[2], 0]))

    const numberOfPossibleProcs = [0,1,2,2,3]
    let numberOfModificators = numberOfPossibleProcs[this.rarity - 1] + randInt(2)
    for(var i = 0; i < numberOfModificators; i++){
      this.generateModificator()
    }
  }

  generateModificator(){

    let possibleProcs = procsPerPiece[this.type][this.rarity - 1].concat(procsPerPiece.generic[this.rarity- 1])
    possibleProcs = possibleProcs.filter(proc => !this.modificators.some(modificator => modificator.type == proc[0]))

    let randProcIndex = randInt(possibleProcs.length) //Generating the modificator index
    const procInfo = possibleProcs[randProcIndex]
    const proc = new modificator(`${this.type}_${this.rarity}_${procInfo[0]}`, procInfo[0], 1 + procInfo[1], [procInfo[1], procInfo[2]])
    this.modificators.push(proc)

  }

  get xpNeededToLevelUp(){
    return Math.floor(Math.pow(this.rarity, 1.7)*(10 + 4*this.lvl + this.lvl*this.lvl))
  }

  giveXP(message: Message, amount:number){
    this.xp += amount
    let tempXP
    if(this.xpNeededToLevelUp <= this.xp && this.lvl < 15){ //Enough XP to level up and have not reached level max
      this.value += this.rarity*10
      this.xp -= this.xpNeededToLevelUp
      tempXP = this.xp
      this.xp = 0
      this.lvl++
      message.addResponse(eval(getLoc)("equipment_waifu_lvl_up"))
      const mainStat = this.modificators[0]
      mainStat.value += mainStat.valueIncrease![0]

      if(this.lvl % 3 == 0){
        if(this.modificators.length < MAX_PROCS){ // If there is still available procs slots
          this.generateModificator()
          message.addResponse(eval(getLoc)("equipment_waifu_new_modificator"))
        }
        else {
          const modificator = this.modificators[randInt(MAX_PROCS)]
          modificator.value += randInt(1 + modificator.valueIncrease![1]*100)/100

          message.addResponse(eval(getLoc)("equipment_waifu_upgraded_modificator"))
        }
      }
      this.giveXP(message, tempXP)
      message.addResponse(eval(getLoc)("equipment_waifu_lvl_up"))
    }
  }

  showStats(message: Message){
    const embed = createSimpleEmbed(`${eval(getLoc)(this.name) + "★".repeat(this.rarity)} [${eval(getLoc)(this.type)}]`, eval(getLoc)(this.description), )
    embed.addFields([
      {
        name:"level",
        value:`LVL: ${this.lvl}/15 \r\n XP: ${this.xp}/${this.lvl == 15 ? "-" : this.xpNeededToLevelUp}`
      },
      {
        name:"modificators",
        value:this.modificators.reduce((accumulator, modificator) => accumulator += modificator.toString(message), '')
      }
    ])
    return embed
  }
}





/*toString(){
    "id: " + this.id + " name: " + this.name + " level: " + this.lvl + " rarity: " +
    this.rarity + " type: " + this.type + " set: " + this.set + " img : " + this.img +
    " tabModificators: " + this.tabModificators;
}*/
