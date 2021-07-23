import item from './item/item'
import consumableUser from './item/consumableUser'
import consumableWaifu from './item/consumableWaifu'
import equipmentUser from './item/equipmentUser'
import equipmentWaifu from './item/equipmentWaifu'
import materials from './item/materials'



export default class itemManager {
  public readonly objectType = "itemManager"
  public consumableUser: Array<{item:consumableUser, qty:number}>
  public consumableWaifu: Array<{item:consumableWaifu, qty:number}>
  public equipmentUser: Array<{item:equipmentUser, qty:number}>
  public equipmentWaifu: Array<{item:equipmentWaifu, qty:number}>
  public materials: Array<{item:materials, qty:number}>

  constructor(){
    this.consumableUser = []
    this.consumableWaifu = []
    this.equipmentUser = []
    this.equipmentWaifu = []
    this.materials = []
    this.objectType;
  }

  get totalItemCount(){
    const userConCount = this.consumableUser.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const userItemCount = this.equipmentUser.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuConCount = this.consumableWaifu.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuItemCount = this.equipmentWaifu.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const matCount = this.materials.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    return userConCount + userItemCount + waifuConCount + waifuItemCount + matCount
  }

  addItem(item: materials | equipmentUser | equipmentWaifu | consumableWaifu | consumableUser | string, qty = 1){
    if(typeof item == "string"){
      item = items.get(item) as item
    }

    if(item.objectType != "equipmentWaifu" /*&& item.objectType != "equipmentUser"*/){
      let itemAndQty = this[item.objectType].find((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == (item as item).id )
      if(itemAndQty == undefined){
        this[item.objectType].push({item:item, qty:qty})
      }
      else{
        itemAndQty.qty += qty
      }
    }
    else{
      this[item.objectType].push({item:item, qty:1})
    }
    this[item.objectType].sort((itemA, itemB) => itemA.item.tier - itemB.item.tier)
  }

  removeItem(id: string, amount:number = 1){
    let item = items.get(id)
    if(typeof item == "undefined") return;
    let index = this[item.objectType].findIndex((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)


    if(this[item.objectType][index].qty > amount){
      this[item.objectType][index].qty -= amount
    }
    else{
      this[item.objectType].splice(index)
    }
  }

  hasItem(id: string): boolean {
    let item = items.get(id)

    if(typeof item == "undefined") return false;
    return this[item.objectType].some((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)
  }
}
