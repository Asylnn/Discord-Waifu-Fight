// @ts-nocheck

import fs from 'fs'
import questManager from './class/questManager'
import itemManager from './class/itemManager'
import collection from './class/collection'
import Item from './class/item/item'
import Waifu from './class/waifu'
import User from './class/user'
import Material from './class/item/material'
import WaifuConsumable from './class/item/waifuConsumable'
import UserEquipment from './class/item/userEquipment'
import UserConsumable from './class/item/userConsumable'
import Message from './class/message'
import Modificator from './class/modificator'

var w = (nb:number) => BigInt(Math.pow(2, nb))
const userCol = new collection()

export default async function convert(){
  const message  = new Message("en.","","GUILD_TEXT",-1,null,'-1');
  (await users.all()).forEach((user)=>{

    delete user.gachaCurrency

    const tempUser = new User()
    Object.assign(tempUser, user)
    //console.log(user)
    user.modificators = user.modificators.map(mod => new Modificator(mod.origin, mod.type, mod.value))
    user.equipedItems = user.equipedItems.map(item => {
      if(item && item.id == "-1") return null
      else return item
    })
    user.items.waifuEquipment = []
    user.items.waifuConsumable = user.items.waifuConsumable.map(({item, qty}) => {
      if(!item) return {item:items.get("73"), qty:qty}
      return {item:items.get(item.id), qty:qty}
    })
    user.items.userConsumable = user.items.userConsumable.map(({item, qty})=> {
      if(!item) return {item:items.get("72"), qty:qty}
      return {item:items.get(item.id), qty:qty}
    })
    user.items.material = user.items.material.map(({item, qty})=> {
      if(!item) return {item:items.get("70"), qty:qty}
      return {item:items.get(item.id), qty:qty}
    })
    user.items.userEquipment = user.items.userEquipment.map(({item, qty})=> {
      if(!item) return {item:items.get("71"), qty:qty}
      return {item:items.get(item.id), qty:qty}
    })
    user.items.userConsumable = user.items.userConsumable.filter((itemAndQty) => itemAndQty.item)

    user.waifus = user.waifus.map(waifu => {
      //if(user.osuName == "QuentinFTW") console.log("a", waifu.id)

      if(waifu && waifu.id == "-1") return null
      return convertWaifu(waifu, user, message)
    })

    user.milestone = user.milestone & ~w(5)

    user.modificators = user.modificators.filter(modificator => modificator.origin != "nakano")

    user.reserveWaifu = user.reserveWaifu.map(waifu => {
      return convertWaifu(waifu, user, message)
    })
    //console.log(user)
    user.save();
  })

  //console.log(message.content)

}

function convertWaifu(waifu:Waifu | null, user:User, message:Message){
  console.log(waifu.diffLvlUp)
  if(!waifu) return waifu
  if(user.osuName == "QuentinFTW"){
    console.log("QuentinFTW", waifu.id)
  }
  if(user.osuName == "Honthagr"){
    console.log("Honthagr", waifu.id)
  }
  if(user.osuName == "Takamin"){
    console.log("Takamin", waifu.id)
  }
  if(user.osuName == "Eyre"){
    console.log("Eyre", waifu.id)
  }
  const template = waifus.get(waifu.id.toString())
  const waifu2 = new Waifu(user, template)
  waifu2.name = waifu.name
  console.log(waifu.xp)
  let totalXP = waifu.xp

  /*for(var i = 1; i < waifu.stars; i++){
    waifu2.stars++
    waifu2.b_luck += 3*waifu2.u_luck
    waifu2.b_agi += 3*waifu2.u_agi
    waifu2.b_int += 3*waifu2.u_int
    waifu2.b_dext += 3*waifu2.u_dext
    waifu2.b_stg += 3*waifu2.u_stg
    waifu2.b_kaw += 3*waifu2.u_kaw
  }*/
  console.log(waifu.lvl)
  for (var j = 1; j <= waifu.lvl; j++) {
    let diffLvlUp = 1
    if(waifu.id == "1000") diffLvlUp = 1.2
    if(waifu.id == "39") diffLvlUp = 1.25
    if(waifu.name == "Asuna-sama") console.log(waifu.id)
    totalXP += Math.floor(((1 + diffLvlUp)*j + 5*j + 20)*diffLvlUp)
  }



  console.log(totalXP)
  waifu2.giveXP(totalXP, message, true)
  waifu2.owner = undefined
  waifu2.modificators = []
  if(waifu.id == "18") waifu2.modificators.push(new modificator("suzumiya_haruhi_waifu_bonus", "reduce_action_time", 1.5))

  //if(waifu2.name == "Yuu Koito") console.log("convert", waifu2)

  return waifu2
}

/*export default function convert(){
  const data = fs.readFileSync('usersave.json')
  const oldUsers = JSON.parse(data.toString())
  oldUsers.forEach((user:any) => {
    user = user[1]
    user.milestone = BigInt(user.milestone) & (w(40) - w(10) - 1n)
    user.milestone = BigInt(user.milestone) & (w(40) - w(11) - 1n)
    user.equipedItems = [convertItem(user.item)]
    const items = user.items
    user.items = new itemManager()
    items.forEach((oldItem: any) => {
      oldItem = oldItem[1]
      if(oldItem.id == 9 || oldItem.id == 11 || oldItem.id == 10 || oldItem.id == 12 || oldItem.id == 8){}
      else{
        console.log(oldItem.id)
        user.items.addItem(oldItem.id.toString(), oldItem.amount)
      }

    });
    user.modificators = []
    user.objectType = "user"
    user.osuId  = 0
    user.multXP = user.xpmult
    user._money = user.coins
    user.gamemode = "osu"
    user.dailyTimestamp = 0
    user.beMentionned = true
    user.playedMapsIds = []
    user.lvl = 1
    user.xp = 0
    user.waifuXP = user.stdXP + user.pureXP
    user.fight = {isInAFight: true}
    user.boxs = []
    user.currentDealId = "-1"
    user.waifuManager = {objectType:"waifuManager", owner: undefined}
    const count = user.quests.count
    user.quests = new questManager(user)
    user.quests.totalQuestDone = count

    user.waifus = user.waifus.map((waifu:any) => {
      return convertWaifu(waifu)
    })
    user.reserveWaifu = user.reserveWaifu.map((waifu:any) => {
      return convertWaifu(waifu)
    })

    user.playCount.osu = user.playCount["0"]
    user.playCount.mania = user.playCount["3"]
    user.playCount.taiko = user.playCount["1"]
    user.playCount.fruits = user.playCount["2"]

    delete user.daily
    delete user.xpmult
    delete user.mode
    delete user.noMentions
    delete user.coins
    delete user.playedMaps
    delete user.locallvl
    delete user.residue
    delete user.stdXP
    delete user.pureXP
    delete user.box
    delete user.item


    delete user.playCount["0"]
    delete user.playCount["1"]
    delete user.playCount["2"]
    delete user.playCount["3"]
    users.put(user.id, user)
    //userCol.set(user.id, user)
  });
}

function convertWaifu(waifu: any){
  waifu = waifu[1]

  const templateWaifu = waifus.get(waifu.id.toString())
  if(waifu.id == "-1"){
    //@ts-ignore
    return new waifuClass()
  }
  else if(!templateWaifu){console.log("templateWaifu is undefined! waifu ID is : ", waifu.id); return;}
  if(waifu.id == "18"){
    waifu.modificators = [{origin:"base_waifu_bonus", type:"reduce_action_time", value:1.66, expirationTimestamp:-1}]
  }
  else {
    waifu.modificators = []
  }
  waifu.o_exp = templateWaifu.o_exp
  waifu.o_int = templateWaifu.o_int
  waifu.o_luck = templateWaifu.o_luck
  waifu.isTradable = templateWaifu.isTradable
  waifu.objectType = "waifu"
  waifu.owner = undefined
  waifu.action = {isDoingAction:false}
  waifu.equipedItems = [convertItem(waifu.item)]


  delete waifu.userModificators
  delete waifu.milestone
  delete waifu.item


  return waifu

}

function convertItem(item: any){
  let itemTemplate = items.get(item.id.toString())
  if(item.id == -1){
    itemTemplate = new itemClass()
  }
  else if(!itemTemplate){console.log("itemTemplate is undefined! item ID is : ", item.id)}
  return itemTemplate
}*/

/*export default async function convert2(){
  const data = fs.readFileSync('usersave.json')
  const oldUsers = new collection(JSON.parse(data.toString())) as any
  const newUsers = await users.all()
  newUsers.forEach(user => {
    const oldUser = oldUsers.get(user.id)
    user.quests.totalQuestDone = oldUser.quests.count
    user.save()
  })
}*/

/*export default async function convert3(){
  const gem = items.get("23")
  const userss = await users.all()
  userss.forEach(user => {

    if(user.items.hasItem("23")){
      let item = user.items.waifuConsumable.find((itemAndQty: any) => itemAndQty.item.id == "23")
      //@ts-ignore
      item.item.effects = gem.effects
    }

    user.save()
  })
}*/
