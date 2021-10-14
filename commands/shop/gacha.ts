import message from '../../class/message'
import user from '../../class/user'
import {GACHA_PRICE} from '../../files/config.json'
import randInt from '../../genericFunctions/randInt'
import waifuClass from '../../class/waifu'
import {deepCopy} from '../../genericFunctions/copy'

function getRandom(){
  let totalWeight = 0

  gachaWaifus.forEach(waifuAndWeight => {
    totalWeight += waifuAndWeight[1]
  })
  const rand = randInt(totalWeight)
  let w = 0
  console.log(totalWeight)
  console.log("rand : ", rand)
  for(var i = 0; true; i++){
    console.log("i : ", i)

    w += gachaWaifus[i][1]

    console.log("w : ", w)

    if(w > rand){
      return gachaWaifus[i][0]
    }
  }
}


export default async function gacha(message: message, user: user){
  if(user._money < GACHA_PRICE){message.addResponse(eval(getLoc)("buy_not_enough_money")); return true}
  user._money -= GACHA_PRICE
  const waifu = new waifuClass(user, deepCopy(getRandom()))
  user.reserveWaifu.push(waifu);
  message.addResponse(eval(getLoc)('gacha_got_waifu'))

}
