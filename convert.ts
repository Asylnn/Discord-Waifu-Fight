import fs from 'fs'
import questManager from './class/questManager'
import itemManager from './class/itemManager'
import collection from './class/collection'
import itemClass from './class/item'
import waifuClass from './class/waifu'
import User from './class/user'

var w = (nb:number) => BigInt(Math.pow(2, nb))
const userCol = new collection()

export default async function convert(){
  (await users.all()).forEach((user)=>{
    const tempUser = new User('asyln', 'asyln')
    Object.assign(user, tempUser)    
    user.save();
  })
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
