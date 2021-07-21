export default function encode(data: any){
  recursiveCheckForUser(data)
  return JSON.stringify(data)
}

function recursiveCheckForUser(object:any){
  if(typeof object == "object" && object != null){
    if(object.objectType == "waifu"){
      object.owner = undefined
    }
    else if(object.objectType == "user"){
      object.waifus.forEach((waifu: any) =>{
        waifu.owner = undefined
      })
      object.reserveWaifu.forEach((waifu: any) =>{
        waifu.owner = undefined
      })
      object.waifuManager.owner = undefined
      object.quests.owner = undefined

      object.milestone = object.milestone.toString()
    }
    else {
      for(const key in object){
        recursiveCheckForUser(object[key])
      }
    }
  }
}
