import {modificator} from "../types/modificator";
import item from './item'

export default class equipementUser extends item {
    private modificators: Array<modificator>

    //Generating a new instance
    constructor(id: string, name: string, description:string, rarity: number, value: number, img:string, modificators: Array<modificator>){
        super(id, name, description, rarity, value, img)
        this.modificators = modificators
    }
}
