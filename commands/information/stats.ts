import message from '../../class/message'
import user from '../../class/user'
import getModificators from '../../genericFunctions/getModificators'

export default async function stats(message: message, user: user){
  let content = ""
  user.equipedItems.forEach((item, i) => {
      content += `${eval(getLoc)("item")} ${i+1}: `
    if(item.id != "-1") content += eval(getLoc)(item.name) + "★".repeat(item.tier) + "\n"
    else content += eval(getLoc)("no_item") + "\n"
  })
  message.reply(eval(getLoc)("stats_header"))

  content += eval(getLoc)("stats_modificator")

  let userXPmult = getModificators(user, 'mult_XP')

  let userBoxadd = getModificators(user, 'add_box_level')
  let hasNakanoBonus = getModificators(user, 'nakano_bonus')
  let userMoneymult = getModificators(user, 'mult_money_earned')

  let userEXmult = getModificators(user, 'mult_EX')
  let userIntMult = getModificators(user, 'mult_int')

  let userXPstdMult = getModificators(user, 'mult_XP_std')
  let userXPmaniaMult = getModificators(user, 'mult_XP_mania')
  let userXPcatchMult = getModificators(user, 'mult_XP_catch')
  let userXPtaikoMult = getModificators(user, 'mult_XP_taiko')

  if(userXPmult != 1){content += `${eval(getLoc)("incr_xp_gain")} : ${Math.round(userXPmult*100 - 100)}% \n`}
  if(userXPstdMult != 1){content += `${eval(getLoc)("incr_xp_gain_std")} : ${Math.round(userXPstdMult*100 - 100)}% \n`}
  if(userXPmaniaMult != 1){content += `${eval(getLoc)("incr_xp_gain_mania")} : ${Math.round(userXPmaniaMult*100 - 100)}% \n`}
  if(userXPcatchMult != 1){content += `${eval(getLoc)("incr_xp_gain_catch")} : ${Math.round(userXPcatchMult*100 - 100)}% \n`}
  if(userXPtaikoMult != 1){content += `${eval(getLoc)("incr_xp_gain_taiko")} : ${Math.round(userXPtaikoMult*100 - 100)}% \n`}

  if(userEXmult != 1){content += `${eval(getLoc)("incr_ex_gain")} : ${Math.round(userEXmult*100 - 100)}% \n`}
  if(userIntMult != 1){content += `${eval(getLoc)("incr_int_gain")} : ${Math.round(userIntMult*100 - 100)}% \n`}

  if(userBoxadd != 0){content += `${eval(getLoc)("incr_luck_box")} \n`}
  if(userMoneymult != 1){content += `${eval(getLoc)("incr_coins_gain")} : ${Math.round(userMoneymult*100 - 100)}% \n`}
  if(hasNakanoBonus != 0){content += `${eval(getLoc)("nakano_bonus")}`}
  message.reply(content)
  user.waifus.forEach((waifu, index) => {if(waifu.id != "-1"){waifu.showStats(message, index)}})
  return true
}
