/*
Ce mini-jeu à l'air pour le moment élitiste en terme de ranking osu!, il faut donc faire en sorte que
les plus débutants puisse quand meme y participer un minimum =
- Accompagnement du user par une waifu / l'équipe active de waifus.
- Refaire le système d'items (Item en classe abstraite).








Addition d'une stat :
Nouvelle stats : chance de double claims, Stat Rare?
Potentiellement stats disponibles uniquement sur un type d'équipement (épée : XP, bottes : EX etc...)



- Mini event : VS entre la personne et un de nous (Asyln & QuentinFTW)
*/


import {modificator} from "./types/modificator";

export default class equipmentWaifu {
    private id: string;
    private name: string;
    private level: number;
    private rarity: number;
    private type: string; //Helmet,chestplate,boots ...
    private set: string;//Maybe add a class for the set of equipment for different checks
    private img: string; //URL of the image
    private tabModificators: Array<modificator>;//The list of modificators

    //Generating a new instance
    constructor(id: string,name: string,rarity: number,type: string,set: string
    ,img: string){
        this.id = id;
        this.name = name;
        this.level = 0;
        this.rarity = rarity;
        this.type = type;
        this.set = set;
        this.img = img;
        this.tabModificators = this.generateModificators(rarity); /* Generating the number of modificators
        depending on the rarity */
    }
    upgradeModificator(){} // Upgrade an existing effect when the max of stats
    generateModificator(){} // Generate a new effect when reaching a milestone
    generateModificators(rarity){
      let modificator = []
    } // Generate the modificator(s) depending on the rarity

    addLevel(){

    }

    toString(){
        "id: " + this.id + " name: " + this.name + " level: " + this.level + " rarity: " +
        this.rarity + " type: " + this.type + " set: " + this.set + " img : " + this.img +
        " tabModificators: " + this.tabModificators;
    }
}
