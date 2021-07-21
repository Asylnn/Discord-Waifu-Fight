import user from '../class/user'
import message from '../class/message'
import randInt from '../genericFunctions/randInt'
import {PAR_DIFFICULTY} from '../files/config.json'

export default function checkAction(user: user, message: message, userMention: any){

  let updateProfile = false

  user.waifus.forEach(waifu => {

    if(waifu.action.isDoingAction){
      if(waifu.action.createdTimestamp + waifu.action.timeWaiting < Date.now()){

        updateProfile = true
        if(waifu.action.type == "exploration"){
          let mult = 1, luckMult = 1
          switch(waifu.action.lvl){
            case 1:
              user.giveXP(2, message)
              mult = 0.5
              luckMult = 0.32
              break;
            case 2:
              user.giveXP(4, message)
              break;
            case 3:
              user.giveXP(8, message)
              mult = 3
              luckMult = 4.5
              break;
            case 4:
              user.giveXP(12, message)
              mult = 5.2
              luckMult = 10
              break;
          }
          const reward = Math.floor(waifu.exp/4)*mult
          user.money = reward
          const gainXP = waifu.giveXP(Math.floor(mult*(100 + waifu.exp/1.5)), message)
          message.reply(eval(getLoc)("waifu_back_from_exploration")); gainXP;
          if(Math.random() <= luckMult*waifu.luck/300){
            message.reply(eval(getLoc)("waifu_got_artifact")); userMention;
            user.items.addItem("1") //artifact
          }
          user.quests.updateQuest("do_exploration")
        }



        else if(waifu.action.type == "analyse"){
          user.giveXP(5 + randInt(11), message)
          let gainXP = waifu.giveXP(Math.floor(150 + 1.5*waifu.exp), message)
          if(randInt(2) == 0){
            message.reply(eval(getLoc)("end_analyse_money")); gainXP;
            user.money = 100 + waifu.action.lvl*80
          }
          else{
            let founditem = items.randItem(waifu.action.lvl, "ana")
            if(founditem) user.items.addItem(founditem)
            message.reply(eval(getLoc)("end_analyse_item"))
          }
          user.quests.updateQuest("analyse_artifact")
        }



        else if(waifu.action.type == "decryption"){
          user.giveXP(5 + randInt(11), message)
          const difficulty = PAR_DIFFICULTY[waifu.action.lvl]
          const gainXP = waifu.giveXP(Math.floor((250 + 3*waifu.action.lvl*waifu.int + waifu.action.lvl*120)), message)

          if(randInt(difficulty) < waifu.int){
            let founditem = items.randItem(waifu.action.lvl, "par")
            if(founditem) user.items.addItem(founditem)
            message.reply(eval(getLoc)("end_decrypt_item")); gainXP;
          }
          else{
            let reward = 100 + waifu.action.lvl*80
            message.reply(eval(getLoc)("end_decrypt_money")); gainXP;
            user.money = reward
          }
          user.quests.updateQuest("decrypt_parchement")
        }
        waifu.action.isDoingAction = false

      }

    }

  })
  if(updateProfile) user.save()
}
