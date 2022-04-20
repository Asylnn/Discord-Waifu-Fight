import level from "level"
import levelTs from "level-ts"
import dealObjectType from './class/types/dealObjectType'
import encode from './encoding/encode'
import decode from './encoding/decode'
import fs from 'fs'


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
import {beatmap} from './class/types/beatmap'

declare global {
  var users: levelTs<user>
  var beatmapsBySR: levelTs<Array<number>>
  var beatmaps: levelTs<beatmap>
  var deals:levelTs<{turn: "0" | "1", proposer: user, accepter:user, '0':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>, '1':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>, valid:boolean}>
}

const beatmaps = level('./files/beatmaps', {keyEncoding:'utf8', valueEncoding:'json'})
global.beatmaps = new levelTs(beatmaps)

/*fs.readFile('./files/beatmapsIds.json', (err, data) => {
  if(err) console.log(err)
  data = JSON.parse(data.toString())
  for(var i = 0; i <= 11; i++){
    data.osu
  }

})*/

/*const dealsJS = level('./files/deals', {keyEncoding:'utf8', valueEncoding:userEncoding})
global.deals = new levelTs(dealsJS);*/

const usersJS = level('./files/users', {keyEncoding:'utf8', valueEncoding:userEncoding})
global.users = new levelTs(usersJS);


const beatmapsBySR = level('./files/beatmapsBySR', {keyEncoding:'utf8', valueEncoding:'json'})
global.beatmapsBySR = new levelTs(beatmapsBySR);
