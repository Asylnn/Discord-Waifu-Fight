import user from '../class/user'
import waifu from '../class/waifu'
import message from '../class/message'
import randInt from '../genericFunctions/randInt'
import {QUEST_PROBABILITY_BONUS} from '../files/config.json'

export default function checkQuests(user: user, message: message, userMention: any){
  if(user.quests.date != (new Date()).getDate()){
    user.newStatDay()
    user.quests.refreshQuests()
  }

  user.quests.activeQuests.forEach((userQuest, index) => {
    if(userQuest.name != "completed"){
      if(userQuest.state >= userQuest.objective){
        user.quests.totalQuestDone++
        let rand: number, reward: number, rewardGC: number
        switch (userQuest.difficulty) {
          case 1:
            reward = 25 + randInt(50)
            rewardGC = 5 + randInt(10)

            user.giveXP((3 + randInt(3)), message)

            message.addResponse(eval(getLoc)("quest_completed_1")); userMention; rewardGC;
            rand = randInt(100)
            break;
          case 2:
            user.giveXP((6 + randInt(6)), message)
            reward = 50 + randInt(100)
            rewardGC = 10 + randInt(20)


            user.waifuXP += 750*((user.lvl+50)/50)
            message.addResponse(eval(getLoc)("quest_completed_2"))
            rand = 100 + randInt(50)
            break;
          case 3:
            user.giveXP(12 + randInt(12), message)
            reward = reward = 75 + randInt(150)
            rewardGC = 15 + randInt(30)


            user.waifuXP += 1500*((user.lvl+50)/50)
            const item = items.randItem(user.boxLevel, "box")
            if(item) user.items.addItem(item)
            message.addResponse(eval(getLoc)("quest_completed_3"))
            rand = 75 + randInt(25)
            break;
          default:
        }
        user.money = reward!
        user.gachaCurrency = rewardGC!
        if(randInt(100) > QUEST_PROBABILITY_BONUS){
          rand = randInt(5)
          switch (rand) {
            case 0:
            case 1:
              const itemArtifact = items.randItem(user.anaLevel, "ana")

              if(itemArtifact) user.items.addItem(itemArtifact)
              message.addResponse(eval(getLoc)("quest_completed_bonus_1"))
              break;
            case 2:
            case 3:
              let itemPar = items.randItem(user.parLevel, "par")

              if(itemPar) user.items.addItem(itemPar)
              message.addResponse(eval(getLoc)("quest_completed_bonus_2"))
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
              message.addResponse(eval(getLoc)("quest_completed_bonus_3"))
              break;
            default:

          }
        }
        user.quests.activeQuests[index].name = "completed"
        user.save()
        message.reply()
      }
    }
  });
}
