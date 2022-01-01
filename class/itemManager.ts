import item from './item/item'
import WaifuEquipment from './item/waifuEquipment'
import UserEquipment from './item/userEquipment'
import UserConsumable from './item/userConsumable'
import WaifuConsumable from './item/waifuConsumable'
import Material from './item/material'

type itemClassType =  Material | WaifuEquipment | UserEquipment | UserConsumable | WaifuConsumable



export default class itemManager {
  public readonly objectType = "itemManager"
  public userConsumable: Array<{item:UserConsumable, qty:number}>
  public waifuConsumable: Array<{item:WaifuConsumable, qty:number}>
  public userEquipment: Array<{item:UserEquipment, qty:number}>
  public waifuEquipment: Array<WaifuEquipment>
  public material: Array<{item:Material, qty:number}>


  constructor(){
    this.userConsumable = []
    this.waifuConsumable = []
    this.userEquipment = []
    this.waifuEquipment = []
    this.material = []
    this.objectType;
  }

  get totalItemCount(){
    const userConCount = this.userConsumable.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const userItemCount = this.userEquipment.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuConCount = this.waifuConsumable.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    const waifuItemCount = this.waifuEquipment.length
    const matCount = this.material.reduce((accumulator, itemAndQty) => accumulator += itemAndQty.qty, 1)
    return userConCount + userItemCount + waifuConCount + waifuItemCount + matCount
  }

  addItem(itemOrId: item | string , qty = 1){
    let item: itemClassType
    if(typeof itemOrId == "string"){
      item = items.get(itemOrId)
    }
    else {
      item = itemOrId as itemClassType
    }
    if(item.objectType == "waifuEquipment"){
      let materialAndQty = (this[item.objectType]).find(itemAndQty => itemAndQty.id == item.id)
      if(materialAndQty == undefined) (this[item.objectType]).push(item)
      this[item.objectType].sort((itemA, itemB) => itemA.rarity - itemB.rarity)
    }
    else {
      let materialAndQty = (this[item.objectType] as {item:itemClassType, qty:number}[]).find(itemAndQty => itemAndQty.item.id == item.id)
      if(materialAndQty == undefined) (this[item.objectType] as {item:itemClassType, qty:number}[]).push({item:item, qty:qty})
      else materialAndQty.qty += qty
      this[item.objectType].sort((itemA, itemB) => itemA.item.rarity - itemB.item.rarity)
    }
  }

  removeItem(item: itemClassType, amount:number = 1){

    if(item.objectType == "waifuEquipment"){
      let index = this.waifuEquipment.findIndex(equipment => equipment.uniqueId == item.uniqueId)
      this.waifuEquipment.splice(index, 1)
    }
    else {
      let index = this[item.objectType].findIndex((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == item.id)
      if(this[item.objectType][index].qty > amount){
        this[item.objectType][index].qty -= amount
      }
      else{
        this[item.objectType].splice(index, 1)
      }
    }
  }

  removeItemById(id:string, amount:number = 1){
    let item = items.get(id) as Material | UserEquipment | UserConsumable | WaifuConsumable
    let index = this[item.objectType].findIndex((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)


    if(this[item.objectType][index].qty > amount){
      this[item.objectType][index].qty -= amount
    }
    else{
      this[item.objectType].splice(index)
    }
  }

  hasItem(id: string): boolean {
    let item = items.get(id) as Material | UserEquipment | UserConsumable | WaifuConsumable

    if(typeof item == "undefined") return false;
    return this[item.objectType].some((itemAndQty: {item:item, qty:number}) => itemAndQty.item.id == id)
  }
}
