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





import {modificator} from "../types/modificator";
import randInt from '../../genericFunctions/randInt'
import message from '../../class/message'
import item from './item'
import equipmentType from '../types/equipmentType'
import {modificatorType} from '../types/modificator'


const procsPerPiece: {
  "generic":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "weapon":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "outfit":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "accessory":Array</*rarity*/Array<[modificatorType, number, number]>>
} = {
  "generic": [/*Rareté 1*/[["mult_stg",1,2],["mult_int",1,2],["mult_kaw",1,2],["mult_agi",1,2],["mult_dext",1,2],["mult_luck",1,2],["mult_XP",3,3]],
              /*Rareté 2*/[["mult_stg",2,2],["mult_int",2,2],["mult_kaw",2,2],["mult_agi",2,2],["mult_dext",2,2],["mult_luck",2,2],["mult_XP",5,3]],
              /*Rareté 3*/[["mult_stg",3,3],["mult_int",3,3],["mult_kaw",3,3],["mult_agi",3,3],["mult_dext",3,3],["mult_luck",3,3],["mult_XP",7,4]],
              /*Rareté 4*/[["mult_stg",5,4],["mult_int",5,4],["mult_kaw",5,4],["mult_agi",5,4],["mult_dext",5,4],["mult_luck",5,4],["mult_XP",9,6]],
              /*Rareté 5*/[["mult_stg",6,5],["mult_int",6,5],["mult_kaw",6,5],["mult_agi",6,5],["mult_dext",6,5],["mult_luck",6,5],["mult_XP",11,7]]
             ],
  "weapon": [],
  "outfit": [],
  "accessory": []
}

const mainStatPerPiece: {
  "weapon":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "outfit":Array</*rarity*/Array<[modificatorType, number, number]>>,
  "accessory":Array</*rarity*/Array<[modificatorType, number, number]>>
} = {
  "weapon": [],
  "outfit": [],
  "accessory": []
}

const maxProcs = 5


export default class equipmentWaifu extends item {
  public readonly objectType = "equipmentWaifu"
  public lvl = 0;
  public xp = 0
  public readonly type: equipmentType; // Helmet,chestplate,boots ...
  public readonly set: string;// Maybe add a class for the set of equipment for different checks
  public tabModificators: Array<modificator>;//The list of modificators

  constructor(id: string, name: string, description:string, rarity: number, img:string, type: equipmentType, set: string){
    //Générer valeur
    super(id, name, description, rarity, rarity*100, img)

    this.type = type;
    this.set = set;
    this.tabModificators = []
    const modificatorInfo = mainStatPerPiece[this.type][rarity - 1][randInt(mainStatPerPiece[this.type][rarity - 1].length)]
    this.tabModificators = [{
      origin: `${this.type}_${this.rarity}_${modificatorInfo[0]}`,
      value: modificatorInfo[1],
      type:modificatorInfo[0],
      valueIncrease:[modificatorInfo[2], 0]
    }]

    let numberOfPossibleProcs = [1,2,3,3,4]
    let numberOfModificators = numberOfPossibleProcs[this.rarity] + randInt(2)
    for(var i = 0; i < numberOfModificators; i++){
      this.generateModificator()
    }
  }

  generateModificator(){

    const possibleProcs = procsPerPiece[this.type][this.rarity - 1].concat(procsPerPiece.generic[this.rarity- 1])
    possibleProcs.filter(proc => !this.tabModificators.some(tabModificator => tabModificator.type == proc[0]))

    let randProcIndex = randInt(possibleProcs.length) //Generating the modificator index
    const procInfo = possibleProcs[randProcIndex]
    const proc : modificator = {
      origin: `${this.type}_${this.rarity}_${procInfo[0]}`,
      value: procInfo[1] + randInt(procInfo[2] + 1),
      type:procInfo[0],
      valueIncrease: [procInfo[1], procInfo[2]]
    }

    this.tabModificators.push(proc)

  }

  get xpNeededToLevelUp(){
    return 0
  }

  giveXP(message: message, amount:number){
    this.xp += amount
    let tempXP
    if(this.xpNeededToLevelUp >= this.xp && this.lvl < 15){ //Enough XP to level up and have not reached level max
      this.value += this.rarity*10
      this.xp -= this.xpNeededToLevelUp
      tempXP = this.xp
      this.xp = 0
      message.reply(eval(getLoc)("equipment_waifu_lvl_up"))
      const mainStat = this.tabModificators[0]
      if(mainStat.valueIncrease){
        mainStat.value += mainStat.valueIncrease[0]*(1 + Math.pow(this.lvl, 3)/2000)
      }
      else {
        message.reply("there is an error, mainStat.valueIncrease is undefined (equipmentWaifu.ts)")
      }
      if(this.lvl % 3 == 0){
        if(this.tabModificators.length < maxProcs + 1){ // If there is still available procs slots
          this.generateModificator()
        }
        else {
          const modificator = this.tabModificators[randInt(maxProcs + 1)]
          if(modificator.valueIncrease){
          modificator.value += modificator.valueIncrease[0] + randInt(1 + modificator.valueIncrease[0])
          }
          else {
            message.reply("there is an error, modificator.valueIncrease is undefined (equipmentWaifu.ts)")
          }
        }
      }
      this.giveXP(message, tempXP)
      message.reply(eval(getLoc)("equipment_waifu_lvl_up"))
    }
  }
}





/*toString(){
    "id: " + this.id + " name: " + this.name + " level: " + this.lvl + " rarity: " +
    this.rarity + " type: " + this.type + " set: " + this.set + " img : " + this.img +
    " tabModificators: " + this.tabModificators;
}*/
