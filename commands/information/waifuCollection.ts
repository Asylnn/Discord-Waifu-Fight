import message from '../../class/message'
import user from '../../class/user'
import templateWaifu from '../../class/templateWaifu'
import {LEVEL_PERMISSIONS, TEST_BUILD} from '../../files/config.json'

commandManager?.create({
  name:"collection",
  type:"CHAT_INPUT",
  description:"see all the existing waifus and which one you got!",
})

export default async function waifuCollection(message: message, user: user){
  if(user.lvl < LEVEL_PERMISSIONS.collection && !TEST_BUILD){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  let col = ""
  waifus.each((templateWaifu: templateWaifu) => {
    let foundId = false
    user.waifus.forEach(waifu => {if(waifu != null && waifu.id == templateWaifu.id){foundId = true}})
    user.reserveWaifu.forEach(waifu => {if(waifu.id == templateWaifu.id){foundId = true}})
    if(foundId){
      col += `\*\*${templateWaifu.name}\*\* ${templateWaifu.rarityName(message)} ✅ \r\n`
    }
    else{
      col += `\*\*${templateWaifu.name}\*\* ${templateWaifu.rarityName(message)} \r\n`
    }
  });
  message.reply(col)
  return true
}
