import item from './item'

export default class itemManager {
  public readonly objectType = "itemManager"
  public userConsumable: Array<{item:item, qty:number}>
  public waifuConsumable: Array<{item:item, qty:number}>
  public userItem: Array<{item:item, qty:number}>
  public waifuItem: Array<{item:item, qty:number}>
  public materials: Array<{item:item, qty:number}>

  constructor(){
    this.userConsumable = []
    this.waifuConsumable = []
    this.userItem = []
    this.waifuItem = []
    this.materials = []
    this.objectType;
  }

  get totalItemCount(){
    const userConCount = this.userConsumable.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const userItemCount = this.userItem.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuConCount = this.waifuConsumable.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuItemCount = this.waifuItem.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const matCount = this.materials.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    return userConCount + userItemCount + waifuConCount + waifuItemCount + matCount
  }

  addItem(item: item | string, qty = 1){
    if(typeof item == "string"){
      item = items.get(item) as item
    }

    if(item.stackable){
      let itemAndQty = this[item.type].find((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == (item as item).id )
      if(itemAndQty == undefined){
        this[item.type].push({item:item, qty:qty})
      }
      else{
        itemAndQty.qty += qty
      }
    }
    else{
      this[item.type].push({item:item, qty:1})
    }
    this[item.type].sort((itemA, itemB) => itemA.item.tier - itemB.item.tier)
  }

  removeItem(id: string, amount:number = 1){
    let item = items.get(id)
    if(typeof item == "undefined") return;
    let index = this[item.type].findIndex((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)


    if(this[item.type][index].qty > amount){
      this[item.type][index].qty -= amount
    }
    else{
      this[item.type].splice(index)
    }
  }

  hasItem(id: string): boolean {
    let item = items.get(id)

    if(typeof item == "undefined") return false;
    return this[item.type].some((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)
  }
}
