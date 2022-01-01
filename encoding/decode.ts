import waifu from '../class/waifu'
import user from '../class/user'
import questManager from '../class/questManager'
import waifuManager from '../class/waifuManager'
import itemManager from '../class/itemManager'
import item from '../class/item/item'
import waifuEquipment from '../class/item/waifuEquipment'
import userEquipment from '../class/item/userEquipment'
import userConsumable from '../class/item/userConsumable'
import waifuConsumable from '../class/item/waifuConsumable'
import material from '../class/item/material'
import modificator from '../class/modificator'


eval(""); waifuManager; questManager; user; waifu; item; itemManager; material; waifuConsumable; userConsumable; userEquipment; waifuEquipment; modificator;


export default function decode(data: string): any{
  const object = JSON.parse(data)
  return recursiveShit2(object)
}

function recursiveShit2(object: any, userObject: any  = undefined){
  let stop = false
  let newObject: any = {}
  if(typeof object == "object" && object != null){
    if(object.objectType){
      if(object.objectType == "user"){
        userObject = object
        object.milestone = BigInt(object.milestone)
      }
      else if(object.objectType == "waifu" || object.objectType == "waifuManager" || object.objectType == "questManager" ){
        object.owner = userObject
        stop = true
      }
      newObject = eval(`Object.assign(new ${object.objectType}_1.default(), object)`)
    }

    if(object.constructor.name == "Array"){
      newObject = []
      object.forEach((value: any) => {
        newObject.push(recursiveShit2(value, userObject))
      })
    }
    else{

      for(const key in object){
        if(!stop) {
          newObject[key] = recursiveShit2(object[key], userObject)
        }
      }
    }
  }
  else{
    return object
  }
  return newObject
}
