import message from '../../class/message'
import user from '../../class/user'

commandManager?.create({
  name:"waifus",
  type:"CHAT_INPUT",
  description:"see all your waifus",
})

export default async function waifus(message:message, user:user){
  let allSlotTaken = true
  let missingWaifus = ""
  user.waifus.forEach((waifu, index) => {
    if(waifu){
      message.embeds.push(waifu.showStats(message, index))
    }
    else{
      allSlotTaken = false
      missingWaifus += (index + 1) + " "
    }
  })
  missingWaifus = allSlotTaken ? "all slot are taken!" : "slot with no waifu : " + missingWaifus
  message.addResponse(missingWaifus)
  return true
}
