import level from "level"
import levelTs from "level-ts"
import dealObjectType from './class/types/dealObjectType'
import encode from './encoding/encode'
import decode from './encoding/decode'


const userEncoding = {
  encode:function(data: any){
    return encode(data)
  },
  decode:function(data: any){
    return decode(data)
  },
  type:"userObject",
  buffer:false
}

/*const regularEncoding = {
  encode:function(data: any){
    return encode(data)
  },
  decode:function(data: any){
    return JSON.parse(data)
  },
  type:"userObject",
  buffer:false
}*/

import user from './class/user'

declare global {
  var nameToId: levelTs<string>
  var users: levelTs<user>
  var deals:levelTs<{turn: "0" | "1", proposer: user, accepter:user, '0':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>, '1':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>, valid:boolean}>
}


const dealsJS = level('./files/deals', {keyEncoding:'utf8', valueEncoding:userEncoding})
global.deals = new levelTs(dealsJS);

const nameToIdJS = level('./files/nameToId', {keyEncoding:'utf8', valueEncoding:'utf8'})
global.nameToId = new levelTs(nameToIdJS);

const usersJS = level('./files/users', {keyEncoding:'utf8', valueEncoding:userEncoding})
global.users = new levelTs(usersJS);
