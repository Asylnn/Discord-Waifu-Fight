import message from '../../class/message'
import user from '../../class/user'

import item from '../../class/item'
import randInt from '../../genericFunctions/randInt'

function boxLootTable(level: number){
  let boxItem = new item()
  let random = randInt(100)
  switch (true) {
    case random <= 27:
      boxItem.effects.push({effect:'earn_money', value:Math.floor((30 + randInt(50))*Math.pow(1.15, level - 1))})
      break;
    case random <= 57:
      boxItem.effects.push({effect:'earn_waifuXP', value:Math.floor((200 + randInt(200))*Math.pow(1.3, level - 1))})
      break;
    case random <= 65:
      boxItem.effects.push({effect:'earn_money', value:Math.floor((60 + randInt(100))*Math.pow(1.15, level - 1))})
      break;
    case random <= 73:
      boxItem.effects.push({effect:'earn_waifuXP', value:Math.floor((400 + randInt(400))*Math.pow(1.3, level - 1))})
      break;
    case random <= 90:

      let obtainedItem = items.randItem(level, "box")
      boxItem.effects.push({effect:'give_item', value:obtainedItem})
      break;
    default: //random <= 99
      switch (level) {
        case 1:
          random = randInt(3)
          switch(random){
            case 1:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("11")}) //Akatsuki
              break;
            case 2:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("29")}) //Rui Tachibana
              break;
            default:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("37")}) //Hina Tachibana
              break;
          }
          break;
        case 2:
          random = randInt(10)
          switch (true) {
            case random <= 1:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("29")}) //Rui Tachibana
              break;
            case random <= 3:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("37")}) //Hina Tachibana
              break;
            case random <= 6:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("11")}) //Akatsuki
              break;
            default:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("14")}) //Takanashi Rikka
              break;
          }
          break;
        default:
          random = randInt(10)
          switch (true) {
            case random <= 1:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("29")}) //Rui Tachibana
              break;
            case random <= 3:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("37")}) //Hina Tachibana
              break;
            case random <= 6:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("11")}) //Akatsuki
              break;
            default:
              boxItem.effects.push({effect:'give_waifu', value:global.waifus.get("14")}) //Takanashi Rikka
              break;
          }
          break;
      }
      break;
  }
  return boxItem
}


export default async function box(message: message, user: user){
  if(user.boxs.length == 0){message.reply(eval(getLoc)("no_lootbox")); return true;}
  user.quests.updateQuest("quest_box", 1)
  boxLootTable(user.boxs.pop() as number).use(message, user)
}
