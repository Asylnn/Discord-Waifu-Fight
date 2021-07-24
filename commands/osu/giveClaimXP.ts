import message from '../../class/message'
import user from '../../class/user'
import {questType} from '../../class/types/quest'
import getModificators from '../../genericFunctions/getModificators'
import {modificatorType} from '../../class/types/modificator'
import hasModificators from '../../genericFunctions/hasModificators'
import randInt from '../../genericFunctions/randInt'

export default function giveClaimXP(message: message, user: user, rawXP: number, mode: string){


  //const tempSolution = mode == "osu"


  user.quests.updateQuest("quest_claim_" + mode as questType)
  //let lb = global.dailyChallenge.lb[1]
  /*let claim = lb.has(user.id) ? lb.get(user.id) : 0
  lb.set(user.id, ++claim)*/

  let waifu = user.waifus[user.fight.indexWaifu]
  let mult = getModificators(waifu, 'mult_XP_' + mode as modificatorType)
  let gainXP = waifu.giveXP(rawXP*mult, message)
  user.giveXP(1 + randInt(1), message)

  console.log("rawXP : " + rawXP)
  console.log("XP : " + gainXP)

  if(hasModificators(waifu, 'get_quest_reroll')){
    const probability = getModificators(waifu, 'mult_XP_' + mode as modificatorType)
    if(Math.random() <= probability){
      user.items.addItem("18") //quest re roll
      message.reply(eval(getLoc)("win_quest_reroll"))
    }
  }
  message.reply(eval(getLoc)("earn_xp_fight"))
  if(Math.random() <= waifu.luck/300){
    user.boxs.push(user.boxLevel)
    message.reply(eval(getLoc)("win_lootbox"))
  }
  user.fight.isInAFight = false
}
