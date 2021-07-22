/* Mother-class*/ 
export default abstract class equipmentWaifu {
    protected id: number;
    protected name: string;
    protected level: number;
    protected rarity: string;
    protected tabModificators: Array<modificator>;

    toString(){
        "id: " + this.id + " name: " + this.name + " level: " + this.level + " rarity: " + 
        this.rarity + " tabModificators: " + this.tabModificators;
    }
}
