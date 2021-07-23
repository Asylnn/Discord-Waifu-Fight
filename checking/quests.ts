import user from '../class/user'
import waifu from '../class/waifu'
import message from '../class/message'
import randInt from '../genericFunctions/randInt'
import {QUEST_PROBABILITY_BONUS} from '../files/config.json'

export default function checkQuests(user: user, message: message, userMention: any){
  if(user.quests.date != (new Date()).getDate()){
    user.quests.refreshQuests()
    user.save()
  }

  user.quests.activeQuests.forEach((userQuest, index) => {
    if(userQuest.name != "completed"){
      if(userQuest.state >= userQuest.objective){
        user.quests.totalQuestDone++
        let rand, reward
        switch (userQuest.difficulty) {
          case 1:
            reward = 100 + user.lvl*2
            user.money = reward
            user.giveXP((3 + randInt(3)), message)
            message.reply(eval(getLoc)("quest_completed_1")); userMention;
            rand = randInt(100)
            break;
          case 2:
            user.giveXP((6 + randInt(6)), message)
            reward = 200 + user.lvl*4
            user.money = reward

            user.waifuXP += 750*((user.lvl+50)/50)
            message.reply(eval(getLoc)("quest_completed_2"))
            rand = 50 + randInt(50)
            break;
          case 3:
            user.giveXP(12 + randInt(12), message)
            reward = reward = 400 + user.lvl*8
            user.money = reward
            user.waifuXP += 1500*((user.lvl+50)/50)
            const item = items.randItem(user.boxLevel, "box")
            if(item) user.items.addItem(item)
            message.reply(eval(getLoc)("quest_completed_3"))
            rand = 75 + randInt(25)
            break;
          default:
        }
        if(randInt(100) > QUEST_PROBABILITY_BONUS){
          rand = randInt(5)
          switch (rand) {
            case 0:
            case 1:
              const itemArtifact = items.randItem(user.anaLevel, "ana")

              if(itemArtifact) user.items.addItem(itemArtifact)
              message.reply(eval(getLoc)("quest_completed_bonus_1"))
              break;
            case 2:
            case 3:
              let itemPar = items.randItem(user.parLevel, "par")

              if(itemPar) user.items.addItem(itemPar)
              message.reply(eval(getLoc)("quest_completed_bonus_2"))
              break;
            case 4:
              rand = randInt(3)
              let obtainedWaifu
              if(rand == 0){
                obtainedWaifu = waifus.get("39") //Asuna
              }
              else{
                obtainedWaifu = waifus.get("40") //Asada Shino
              }
              user.reserveWaifu.push(new waifu(user, obtainedWaifu))
              message.reply(eval(getLoc)("quest_completed_bonus_3"))
              break;
            default:

          }
        }
        user.quests.activeQuests[index].name = "completed"
        user.save()
      }
    }
  });
}
