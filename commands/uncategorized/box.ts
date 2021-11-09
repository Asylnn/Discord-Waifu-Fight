import message from '../../class/message'
import user from '../../class/user'
import randInt from '../../genericFunctions/randInt'
import consumableUserClass from '../../class/item/consumableUser'

commandManager?.create({
  name:"box",
  type:"CHAT_INPUT",
  description:"open a box if you have one (check by doing /rank)",
})

function boxLootTable(level: number){
  let consumableUser = new consumableUserClass("64", "", "", 0, 0, "", [])
  let random = randInt(100)
  switch (true) {
    case random <= 27:
      consumableUser.effects.push({effectType:'earn_money', value:Math.floor((30 + randInt(50))*Math.pow(1.15, level - 1))})
      break;
    case random <= 57:
      consumableUser.effects.push({effectType:'earn_waifuXP', value:Math.floor((200 + randInt(200))*Math.pow(1.3, level - 1))})
      break;
    case random <= 65:
      consumableUser.effects.push({effectType:'earn_money', value:Math.floor((60 + randInt(100))*Math.pow(1.15, level - 1))})
      break;
    case random <= 73:
      consumableUser.effects.push({effectType:'earn_waifuXP', value:Math.floor((400 + randInt(400))*Math.pow(1.3, level - 1))})
      break;
    case random <= 90:

      let obtainedItem = items.randItem(level, "box")
      consumableUser.effects.push({effectType:'give_item', value:obtainedItem})
      break;
    default: //random <= 99
      switch (level) {
        case 1:
          random = randInt(3)
          switch(random){
            case 1:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("11")}) //Akatsuki
              break;
            case 2:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("29")}) //Rui Tachibana
              break;
            default:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("37")}) //Hina Tachibana
              break;
          }
          break;
        case 2:
          random = randInt(10)
          switch (true) {
            case random <= 1:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("29")}) //Rui Tachibana
              break;
            case random <= 3:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("37")}) //Hina Tachibana
              break;
            case random <= 6:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("11")}) //Akatsuki
              break;
            default:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("14")}) //Takanashi Rikka
              break;
          }
          break;
        default:
          random = randInt(10)
          switch (true) {
            case random <= 1:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("29")}) //Rui Tachibana
              break;
            case random <= 3:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("37")}) //Hina Tachibana
              break;
            case random <= 6:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("11")}) //Akatsuki
              break;
            default:
              consumableUser.effects.push({effectType:'give_waifu', value:global.waifus.get("14")}) //Takanashi Rikka
              break;
          }
          break;
      }
      break;
  }
  return consumableUser
}


export default async function box(message: message, user: user){
  if(!user.boxs.length){message.addResponse(eval(getLoc)("no_lootbox")); return true;}
  user.quests.updateQuest("quest_box", 1)
  user.items.addItem(boxLootTable(user.boxs.pop()!))
}
