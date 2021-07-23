/*
Ce mini-jeu à l'air pour le moment élitiste en terme de ranking osu!, il faut donc faire en sorte que
les plus débutants puisse quand meme y participer un minimum =
- Accompagnement du user par une waifu / l'équipe active de waifus.
- Refaire le système d'items (Item en classe abstraite).








Addition d'une stat :
Nouvelle stats : chance de double claims, Stat Rare?
Potentiellement stats disponibles uniquement sur un type d'équipement (épée : XP, bottes : EX etc...)



- Mini event : VS entre la personne et un de nous (Asyln & QuentinFTW)

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
