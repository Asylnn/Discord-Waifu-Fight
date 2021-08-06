import item from './item'

export default class material extends item {
  public readonly objectType = "material"


  //Generating a new instance
  constructor(id: string, name: string, description:string, rarity: number, value: number, img:string){
      super(id, name, description, rarity, value, img)
  }
}
