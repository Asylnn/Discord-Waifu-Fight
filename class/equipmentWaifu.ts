import modificator from "./types/modificator";
 
export default class equipmentWaifu {
    private id: number;
    private name: string;
    private level: number;
    private rarity: string;
    private type: string; //Helmet,chestplate,boots ...
    private set: string;//Maybe add a class for the set of equipment for different checks
    private img: string; //URL of the image
    private tabModificators: Array<modificator>;//The list of modificators

    //Generating a new instance
    constructor(id: number,name: string,level: number,rarity: string,type: string,set: string
    ,img: string){
        this.id = id;
        this.name = name;
        this.level = 0;
        this.rarity = rarity;
        this.type = type;
        this.set = set;
        this.img = img;
        this.tabModificators = generateEffect(rarity); /*Generating the number of modificators
        depending on the rarity*/
    }

    generateEffect(){}//Generate a new effect when reaching a milestone
    generateEffect(rarity){} //Generate the modificator(s) depending on the rarity

    toString(){
        "id: " + this.id + " name: " + this.name + " level: " + this.level + " rarity: " + 
        this.rarity + " type: " + this.type + " set: " + this.set + " img : " + this.img +
        " tabModificators: " + this.tabModificators;
    }
}
