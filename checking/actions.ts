import user from '../class/user'
import message from '../class/message'
import item from '../class/item/item'
import materials from '../class/item/material'


import randInt from '../genericFunctions/randInt'
import {PAR_DIFFICULTY, ANA_DIFFICULTY} from '../files/config.json'
import waifuConsumable from '../class/item/waifuConsumable'
import collection from '../class/collection'
import Modificator from '../class/modificator'
const {getModificators} = Modificator

export default function checkAction(user: user, message: message, userMention: any){

  let updateProfile = false
  let modificator: number
  user.waifus.forEach(waifu => {
    if(waifu?.action && waifu.action.type != "dungeon"){
      if(waifu.action.createdTimestamp + waifu.action.timeWaiting < Date.now()){
        modificator = getModificators(waifu, 'exploration_capability').value
        let gainXP:number, mult = 1
        updateProfile = true
        switch(waifu.action.type){
          case "exploration":
            switch(waifu.action.lvl){
              case 1:
                user.giveXP(2, message)
                mult = 0.5
                break;
              case 2:
                user.giveXP(4, message)
                break;
              case 3:
                user.giveXP(8, message)
                mult = 3
                break;
              case 4:
                user.giveXP(12, message)
                mult = 5.2
                break;
            }
            gainXP = waifu.giveXP((100 + randInt(150))*mult, message)
            const agiMult = 1 + modificator*waifu.agi/200
            const numberOfItems = Math.floor(1 + randInt(200 + waifu.agi)/200)
            console.log(numberOfItems)
            const randomItem = [
              [items.get("1")/*Artifact*/, 10*mult],
              [items.get("2")/*Parchment*/, 10*mult],
              [items.get("75")/*artifact_fragment*/, 25/( 1 + (agiMult - 1)/4)],
              [items.get("76")/*par_page*/, 25/( 1 + (agiMult - 1)/4)],
              [items.get("77")/*purse*/, 30/agiMult],
            ] as Array<[item, number]>
            items.getColRand([randomItem], 1)

            let obtainedItems: Array<{item:materials, qty:number}> = []
            while(numberOfItems > obtainedItems.length){
              const randItem = items.getColRand([randomItem], 1) as materials
              const index = obtainedItems.findIndex((itemRow) => itemRow.item.id == randItem.id)
              if(index == -1)
                obtainedItems.push({item:randItem, qty:1})
              else
                obtainedItems[index].qty++
            }
            const listOfItems = obtainedItems.reduce((content, {item, qty}) => {
              user.items.addItem(item, qty)
              return content += `x${qty} ${eval(getLoc)(item.name)}\r\n`
            } , "")
            message.addResponse(eval(getLoc)("waifu_back_from_exploration")); listOfItems; gainXP; userMention;
            user.quests.updateQuest("do_exploration")
            break
          case "analyse":
            user.giveXP(5 + randInt(11), message)
            const randANA = randInt(waifu.agi)
            const levelANA = ANA_DIFFICULTY.findIndex(difficulty => difficulty > randANA)
            gainXP = waifu.giveXP((400*randInt(600)), message)
            const foundItemANA = items.randItem(levelANA + waifu.action.lvl, "ana")
            if(foundItemANA) user.items.addItem(foundItemANA)
            message.addResponse(eval(getLoc)("end_analyse_item"))
            user.quests.updateQuest("analyse_artifact")
            break
          case "decryption":
            user.giveXP(5 + randInt(11), message)
            const randPAR = randInt(waifu.int/2)
            const levelPAR = PAR_DIFFICULTY.findIndex(difficulty => difficulty > randPAR)
            gainXP = waifu.giveXP((400*randInt(600)), message)
            const foundItemPAR = items.randItem(levelPAR + waifu.action.lvl, "par")
            if(foundItemPAR) user.items.addItem(foundItemPAR)
            message.addResponse(eval(getLoc)("end_decrypt_item")); gainXP;
            user.quests.updateQuest("decrypt_parchement")
            break
          case "mining":
            modificator = getModificators(waifu, 'mining_capability').value
            switch(waifu.action.lvl){
              case 1:
                user.giveXP(2, message)
                mult = 0.5
                break;
              case 2:
                user.giveXP(4, message)
                break;
              case 3:
                user.giveXP(8, message)
                mult = 3
                break;
              case 4:
                user.giveXP(12, message)
                mult = 5.2
                break;
            }
            gainXP = waifu.giveXP((100*randInt(150))*mult, message)
            const nbOfMinerals = Math.floor((200 + waifu.stg*modificator)*mult/200)
            let minerals: Array<{item:waifuConsumable, qty:number}> = []
            const itemXP = Math.floor((15 + waifu.stg*modificator)*mult)
            user.itemXP += itemXP
            while(nbOfMinerals > minerals.length){
              const randMineral = items.randItem(1, "mining") as waifuConsumable
              console.log(randMineral)
              const index = minerals.findIndex((mineral) => mineral.item.id == randMineral.id)
              console.log(index)
              if(index == -1)
                minerals.push({item:randMineral, qty:1})
              else
                minerals[index].qty++
            }
            const listOfMinerals = minerals.reduce((content, {item, qty}) => {
              user.items.addItem(item, qty)
              return content += `x${qty} ${eval(getLoc)(item.name)}\r\n`
            } , "")


            message.addResponse(eval(getLoc)("waifu_back_from_mining")); listOfMinerals;
            user.quests.updateQuest("go_mining")
            break
          case "cafe":
          modificator = getModificators(waifu, 'cafe_capability').value
            switch(waifu.action.lvl){
              case 1:
                user.giveXP(2, message)
                mult = 0.5
                break;
              case 2:
                user.giveXP(4, message)
                break;
              case 3:
                user.giveXP(8, message)
                mult = 3
                break;
              case 4:
                user.giveXP(12, message)
                mult = 5.2
                break;
            }
            const gachaReward = (3 + waifu.kaw/800)*mult
            user.gachaCurrency = gachaReward
            gainXP = waifu.giveXP((100*randInt(150))*mult, message)
            message.addResponse(eval(getLoc)("waifu_back_from_cafe")); gainXP;
            user.quests.updateQuest("do_maid_cafe")
            break
        }
        waifu.action = null
      }
    }
  })
  if(updateProfile){
    user.save()
    message.reply()
  }
}
