/*
Ce mini-jeu à l'air pour le moment élitiste en terme de ranking osu!, il faut donc faire en sorte que
les plus débutants puisse quand meme y participer un minimum =
- Accompagnement du user par une waifu / l'équipe active de waifus.
- Refaire le système d'items (Item en classe abstraite). //Fait

Ca se présente comme ca (exemple type):
Couronne de lauriers ***** level 15/60
URL de l'image
Stat principale : Niveau de box + 1
Sub stat principale (fixe) : LUCK + 10 (100% de chances de générer un effet fixe aléatoire parmi les possibles ou la stat définie pour les accessoires)
Sub stat 1 : Chance de drop de box + 15%
Sub stat 2 : 20% de l'exp du claim est réparti entre les autres waifus équipées
Sub stat 3 : INT + 12
Sub stat 4 : Gain de yens + 7%


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

let modificatorArray: Array<modificator> // Modificateurs utilisés dans au moins 1 équipement
let modificatorsPerPieceMap: { // Modificateurs utilisés par équipement
  "weapon":Array<modificator>
  "outfit":Array<modificator>
  "accessory":Array<modificator>
}

import {modificator} from "../types/modificator";
import randInt from '../../genericFunctions/randInt'
import message from '../../class/message'
import item from './item'

type equipmentType = "weapon" | "outfit" | "accessory"

export default class equipmentWaifu extends item {
    public readonly objectType = "equipmentWaifu"
    public lvl = 0;
    public xp = 0
    public readonly type: equipmentType; // Helmet,chestplate,boots ...
    public readonly set: string;// Maybe add a class for the set of equipment for different checks
    public tabModificators: Array<modificator>;//The list of modificators

    //Generating a new instance
    constructor(id: string, name: string, description:string, rarity: number, value: number, img:string, type: equipmentType, set: string){
        super(id, name, description, rarity, value, img)
        this.type = type;
        this.set = set;
        this.tabModificators = []



        let numberOfPossibleProcs = [1,2,3,3,4]
        let numberOfModificators = numberOfPossibleProcs[this.rarity] + randInt(2)
        for(var i = 0; i < numberOfModificators; i++){
          this.generateModificator()
        }

        // this.tabModificators = this.generateModificators(); /* Generating the number of modificators
        // depending on the rarity */
    }
    upgradeModificator(){
      if(this.tabModificators.length < 5){
        this.generateModificator()
      }
      else{
        // On filtre le tableau pour garder les modif présentes
        const upgradeIndex = 1 + randInt(4)
        this.tabModificators[upgradeIndex].value //Générer et le proc et ajouter a la valeur actuelle
      }
    } // Upgrade an existing effect when the max of stats
    generateModificator(){
      // On filtre le tableau pour enlever les modif deja présentes
      let possibleModificators = modificatorsPerPieceMap[this.type].filter(modificator => !this.tabModificators.some(tabModificator => tabModificator.type == modificator.type))
      let randModificatorIndex = randInt(possibleModificators.length) //Generating the modificator
      this.tabModificators.push(possibleModificators[randModificatorIndex])

    } // Generate a new effect when reaching a milestone


    get xpNeededToLevelUp(){
      return 0
    }

    levelUp(){

    }

    giveXP(message: message, amount:number){
      this.xp += amount
      if(this.xpNeededToLevelUp >= this.xp && this.lvl < this.rarity*3){
        this.xp -= this.xpNeededToLevelUp
        this.levelUp()
        message.reply(eval(getLoc)("equipmentWaifu_level_up"))
      }
    }

    /*toString(){
        "id: " + this.id + " name: " + this.name + " level: " + this.lvl + " rarity: " +
        this.rarity + " type: " + this.type + " set: " + this.set + " img : " + this.img +
        " tabModificators: " + this.tabModificators;
    }*/
}
