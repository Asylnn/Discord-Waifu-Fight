import message from '../../class/message'
import user from '../../class/user'
import {questType} from '../../class/types/quest'
import Modificator from '../../class/modificator'
const {getModificators} = Modificator
const {hasModificators} = Modificator
import modificatorType from '../../class/types/modificatorType'
import randInt from '../../genericFunctions/randInt'

export default function giveClaimXP(message: message, user: user, rawXP: number){
  const mode = user.fight.mode
  user.quests.updateQuest("quest_claim_" + mode as questType)
  user.playCount[mode]++

  //let lb = global.dailyChallenge.lb[1]
  /*let claim = lb.has(user.id) ? lb.get(user.id) : 0
  lb.set(user.id, ++claim)*/
  const waifu = user.waifus[user.fight.indexWaifu]!
  console.log(getModificators(waifu, 'mult_XP_' + mode as modificatorType).value)
  const mult = getModificators(waifu, 'mult_XP_' + mode as modificatorType).value*user.multXP
  console.log(mult)
  const earnedXP = waifu.giveXP(rawXP*mult, message)
  user.giveXP(1 + randInt(1), message)


  console.log("rawXP : " + rawXP)
  console.log("XP : " + earnedXP)

  if(hasModificators(waifu, 'get_quest_reroll')){
    const probability = getModificators(waifu, 'get_quest_reroll').value
    if(Math.random() <= probability){
      user.items.addItem("18") //quest re roll
      message.addResponse(eval(getLoc)("win_quest_reroll"))
    }
  }
  message.addResponse(eval(getLoc)("earn_xp_fight"))
  if(Math.random() <= waifu.luck/300){
    user.boxs.push(user.boxLevel)
    message.addResponse(eval(getLoc)("win_lootbox"))
  }
  user.fight.isInAFight = false
}
