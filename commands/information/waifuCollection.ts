import message from '../../class/message'
import user from '../../class/user'
import templateWaifu from '../../class/templateWaifu'
import {LEVEL_PERMISSIONS} from '../../files/config.json'

export default async function waifuCollection(message: message, user: user){
  if(user.lvl < LEVEL_PERMISSIONS.collection){message.reply(eval(getLoc)("lvl_too_low")); return true;}

  let col = ""
  waifus.each((templateWaifu: templateWaifu) => {
    let foundId = false
    user.waifus.forEach(waifu => {if(waifu.id == templateWaifu.id){foundId = true}})
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
