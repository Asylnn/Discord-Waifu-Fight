import waifu from '../class/waifu'
import user from '../class/user'
import questManager from '../class/questManager'
import waifuManager from '../class/waifuManager'
import itemManager from '../class/itemManager'
import item from '../class/item/item'
import equipmentWaifu from '../class/item/equipmentWaifu'
import equipmentUser from '../class/item/equipmentUser'
import consumableUser from '../class/item/consumableUser'
import consumableWaifu from '../class/item/consumableWaifu'
import materials from '../class/item/materials'


eval(""); waifuManager; questManager; user; waifu; item; itemManager; materials; consumableWaifu; consumableUser; equipmentUser; equipmentWaifu;


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
      object.forEach((value: any) => newObject.push(recursiveShit2(value, userObject)))
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
