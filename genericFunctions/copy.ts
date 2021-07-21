import collection from '../class/collection'

export function copyInstance<type>(original: type): type{
  return Object.assign(Object.create(Object.getPrototypeOf(original)),original)
}

export function deepCopy<type extends {[key: string]: any} | collection<any, any>>(object: type, seen: any[] = []): type{
  if(object != null){
    if(object.constructor.name != "collection"){
      if(object.constructor.name != "Array") {
        seen.push(object)
        object = copyInstance(object)
      }
      for (let key in object) {

        if(typeof object[key] == "object"){
          if(!seen.includes(object[key])) object[key] = deepCopy(object[key], seen)
        }
      }
    }
    else{
      var col = new collection()
      for (let key of object as collection<any, any>) {
        typeof key[1] == "object" ? col.set(key[0], deepCopy(key[1], seen)) : col.set(key[0], key[1])
      }
    }
  }
  return /*col ||*/ object
}
