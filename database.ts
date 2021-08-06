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
import beatmap from './class/types/beatmap'

declare global {
  var users: levelTs<user>
  var beatmaps: levelTs<Array<beatmap>>
  var deals:levelTs<{turn: "0" | "1", proposer: user, accepter:user, '0':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>, '1':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>, valid:boolean}>

}


const dealsJS = level('./files/deals', {keyEncoding:'utf8', valueEncoding:userEncoding})
global.deals = new levelTs(dealsJS);

const usersJS = level('./files/users', {keyEncoding:'utf8', valueEncoding:userEncoding})
global.users = new levelTs(usersJS);

const beatmaps = level('./files/beatmaps', {keyEncoding:'utf8', valueEncoding:userEncoding})
global.beatmaps = new levelTs(beatmaps);
