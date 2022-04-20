import message from '../../class/message'
import user from '../../class/user'
import randInt from '../../genericFunctions/randInt'
import consumableUserClass from '../../class/item/userConsumable'

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
      consumableUser.effects.push({effectType:'earn_money', value:Math.floor((10 + randInt(10))*Math.pow(1.1, level - 1))})
      break;
    case random <= 57:
      consumableUser.effects.push({effectType:'earn_waifuXP', value:Math.floor((200 + randInt(200))*Math.pow(1.3, level - 1))})
      break;
    case random <= 65:
      consumableUser.effects.push({effectType:'earn_money', value:Math.floor((20 + randInt(20))*Math.pow(1.1, level - 1))})
      break;
    case random <= 73:
      consumableUser.effects.push({effectType:'earn_waifuXP', value:Math.floor((400 + randInt(400))*Math.pow(1.3, level - 1))})
      break;
    case random <= 90:

      let obtainedItem = items.randItem(level, "box")
      consumableUser.effects.push({effectType:'give_item', value:obtainedItem})
      break;
    default: //random <= 99
      consumableUser.effects.push({effectType:'earn_GC', value:Math.floor((10 + randInt(10))*Math.pow(1.1, level - 1))})
      break;
  }
  return consumableUser
}


export default async function box(message: message, user: user){
  if(!user.boxs.length){message.addResponse(eval(getLoc)("no_lootbox")); return true;}
  user.quests.updateQuest("quest_box", 1)
  user.items.addItem(boxLootTable(user.boxs.pop()!))
}
