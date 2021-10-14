import item from './item/item'
import consumableUser from './item/consumableUser'
import consumableWaifu from './item/consumableWaifu'
import equipmentUser from './item/equipmentUser'
import equipmentWaifu from './item/equipmentWaifu'
import material from './item/materials'

type itemClassType =  material | equipmentUser | consumableUser | consumableWaifu | equipmentWaifu



export default class itemManager {
  public readonly objectType = "itemManager"
  public consumableUser: Array<{item:consumableUser, qty:number}>
  public consumableWaifu: Array<{item:consumableWaifu, qty:number}>
  public equipmentUser: Array<{item:equipmentUser, qty:number}>
  public equipmentWaifu: Array<{item:equipmentWaifu, qty:number}>
  public material: Array<{item:material, qty:number}>


  constructor(){
    this.consumableUser = []
    this.consumableWaifu = []
    this.equipmentUser = []
    this.equipmentWaifu = []
    this.material = []
    this.objectType;
  }

  get totalItemCount(){
    const userConCount = this.consumableUser.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const userItemCount = this.equipmentUser.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuConCount = this.consumableWaifu.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuItemCount = this.equipmentWaifu.length
    const matCount = this.material.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    return userConCount + userItemCount + waifuConCount + waifuItemCount + matCount
  }

  addItem(itemOrId: itemClassType | string , qty = 1){
    let item: itemClassType
    if(typeof itemOrId == "string"){
      item = items.get(itemOrId) as itemClassType
    }
    else {
      item = itemOrId
    }

    /*switch(item.objectType){
      case "equipmentWaifu":
        let equipmentWaifuAndQty = this[item.objectType].find(itemAndQty => itemAndQty.item.id == item.id)
        if(equipmentWaifuAndQty == undefined) this[item.objectType].push({item:item, qty:qty})
        else equipmentWaifuAndQty.qty += qty
        this[item.objectType].sort((itemA, itemB) => itemA.item.rarity - itemB.item.rarity)
        break;
      case "consumableUser":
        let consumableUserAndQty = this[item.objectType].find(itemAndQty => itemAndQty.item.id == item.id)
        if(consumableUserAndQty == undefined) this[item.objectType].push({item:item, qty:qty})
        else consumableUserAndQty.qty += qty
        this[item.objectType].sort((itemA, itemB) => itemA.item.rarity - itemB.item.rarity)
        break;
      case "consumableWaifu":
        let consumableWaifuAndQty = this[item.objectType].find(itemAndQty => itemAndQty.item.id == item.id)
        if(consumableWaifuAndQty == undefined) this[item.objectType].push({item:item, qty:qty})
        else consumableWaifuAndQty.qty += qty
        this[item.objectType].sort((itemA, itemB) => itemA.item.rarity - itemB.item.rarity)
        break;
      case "equipmentUser":
        let equipmentUserAndQty = this[item.objectType].find(itemAndQty => itemAndQty.item.id == item.id)
        if(equipmentUserAndQty == undefined) this[item.objectType].push({item:item, qty:qty})
        else equipmentUserAndQty.qty += qty
        this[item.objectType].sort((itemA, itemB) => itemA.item.rarity - itemB.item.rarity)
        break;
      case "material":
        let materialAndQty = this[item.objectType].find(itemAndQty => itemAndQty.item.id == item.id)
        if(materialAndQty == undefined) this[item.objectType].push({item:item, qty:qty})
        else materialAndQty.qty += qty
        this[item.objectType].sort((itemA, itemB) => itemA.item.rarity - itemB.item.rarity)
        break;
    }*/

  }

  removeItem(id: string, amount:number = 1){
    let item = items.get(id) as material | equipmentUser | consumableUser | consumableWaifu
    let index = this[item.objectType].findIndex((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)


    if(this[item.objectType][index].qty > amount){
      this[item.objectType][index].qty -= amount
    }
    else{
      this[item.objectType].splice(index)
    }
  }

  removeEquipmentWaifu(slot: number){
    this.equipmentWaifu.splice(slot)
  }

  hasItem(id: string): boolean {
    let item = items.get(id) as material | equipmentUser | consumableUser | consumableWaifu

    if(typeof item == "undefined") return false;
    return this[item.objectType].some((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)
  }
}
