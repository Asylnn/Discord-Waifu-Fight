import user from '../class/user'
import message from '../class/message'
import waifu from '../class/waifu'
import modificator from '../class/modificator'

const w = (nb:number) => BigInt(Math.pow(2, nb))


export default function checkAchievements(user: user, message: message, userMention: any){

  const mileStoneState = user.milestone


  if(user.reserveWaifu.length >= 10 && (w(0) & user.milestone) == 0n){
    user.giveXP(50, message)
    user.items.addItem('23')
    message.addResponse(eval(getLoc)("milestone_1")); userMention;
    user.milestone = (user.milestone | w(0))
  }

  if(user.lvl >= 10 && (w(2) & user.milestone) == 0n){
    user._gachaCurrency += 100
    message.addResponse(eval(getLoc)("milestone_3"))
    user.milestone = (user.milestone | w(2))
  }

  if(user.lvl >= 20 && (w(3) & user.milestone) == 0n){
    message.addResponse(eval(getLoc)("milestone_4"))
    let obtainedWaifu = new waifu(user, waifus.get("18")) //Haruhi Suzumiya
    obtainedWaifu.modificators.push(new modificator("suzumiya_haruhi_waifu_bonus", "reduce_action_time", 1.5))
    user.reserveWaifu.push(obtainedWaifu)
    user.milestone = (user.milestone | w(3))
  }
  if(user.lvl >= 30 && (w(33) & user.milestone) == 0n){
    message.addResponse(eval(getLoc)("milestone_23"))
    new modificator("level_30", "mult_XP", 1.1),
    user.milestone = (user.milestone | w(33))
  }
  if(user.lvl >= 40 && (w(34) & user.milestone) == 0n){
    message.addResponse(eval(getLoc)("milestone_24"))
    user._gachaCurrency += 200
    user.milestone = (user.milestone | w(34))
  }
  if(user.lvl >= 50 && (w(35) & user.milestone) == 0n){
    message.addResponse(eval(getLoc)("milestone_25"))
    new modificator("level_50", "mult_money_earned", 1.05)
    user.milestone = (user.milestone | w(35))
  }
  if(user.money >= 3000 && (w(4) & user.milestone) == 0n){
    user.giveXP(50, message)
    user.items.addItem('23')
    message.addResponse(eval(getLoc)("milestone_5"))
    user.milestone = (user.milestone | w(4))
  }
  if(user.money >= 10000 && (w(5) & user.milestone) == 0n){
    user.giveXP(100, message)
    new modificator("level_50", "mult_money_earned", 1.05)
    message.addResponse(eval(getLoc)("milestone_6"))
    user.milestone = (user.milestone | w(5))
  }
  if(user.items.totalItemCount >= 50 && (w(7) & user.milestone) == 0n){
    user.giveXP(50, message)
    user.reserveWaifu.push(new waifu(user, waifus.get("19"))) //Hitagi Senjougahara
    message.addResponse(eval(getLoc)("milestone_8"))
    user.milestone = (user.milestone | w(7))
  }
  /*
  if(hasLegendary && (w(9) & user.milestone) == 0){
    user.addItem(itemsCol.get(23))
    message.addResponse(eval(getLoc)("milestone_10"))
    user.milestone = (user.milestone | w(9))
  }*/

  /*if(user.waifuManager.haveAllNakano && (w(10) & user.milestone) == 0n){
    user.giveXP(50, message)
    user.modificators.push(new modificator("nakano", "nakano_bonus", value:1, expirationTimestamp:-1}, origin:"nakano",type:"mult_XP", 1.1))
    message.addResponse(eval(getLoc)("milestone_11"))
    user.milestone = (user.milestone | w(10))
  }*/

  /*if(user.waifuManager.haveAllBase && (w(11) & user.milestone) == 0n){
    user.modificators.push({origin:"base",type:"mult_XP", value:1.1, expirationTimestamp:-1})

    user.items.addItem("50") //counciousness key
    message.addResponse(eval(getLoc)("milestone_12"))
    user.milestone = (user.milestone | w(11))
  }*/

  /*if(user.playCount.osu >= 50 && (w(12) & user.milestone) == 0n){
    user.giveXP(25, message)
    const mode = eval(getLoc)("standard")
    user.items.addItem("19"); user.items.addItem("14")
    message.addResponse(eval(getLoc)("milestone_13")); mode;
    user.milestone = (user.milestone | w(12))
  }*/

  if(user.playCount.osu >= 100 && (w(13) & user.milestone) == 0n){
    user.giveXP(50, message)
    const mode = eval(getLoc)("standard")
    user.items.addItem("23")
    message.addResponse(eval(getLoc)("milestone_14")); mode;
    user.milestone = (user.milestone | w(13))
  }
  if(user.playCount.osu >= 500 && (w(14) & user.milestone) == 0n){
    user.giveXP(250, message)
    const mode = eval(getLoc)("standard")
    user.modificators.push(new modificator("500_std_claim", "mult_XP_std", 1.1))
    message.addResponse(eval(getLoc)("milestone_15")); mode;
    user.milestone = (user.milestone | w(14))
  }
  if(user.playCount.osu >= 1000 && (w(15) & user.milestone) == 0n){
    user.giveXP(500, message)

    const mode = eval(getLoc)("standard")
    const obtainedWaifu = new waifu(user, waifus.get("30")) //Pippi
    user.reserveWaifu.push(obtainedWaifu)
    message.addResponse(eval(getLoc)("milestone_16")); mode;
    user.milestone = (user.milestone | w(15))
  }

  /*if(user.playCount.taiko >= 50 && (w(16) & user.milestone) == 0n){
    user.giveXP(25, message)

    const mode = eval(getLoc)("taiko")
    user.items.addItem("19"); user.items.addItem("14")
    message.addResponse(eval(getLoc)("milestone_13")); mode;
    user.milestone = (user.milestone | w(16))
  }*/

  if(user.playCount.taiko >= 100 && (w(17) & user.milestone) == 0n){
    user.giveXP(50, message)

    const mode = eval(getLoc)("taiko")
    user.items.addItem('23')
    message.addResponse(eval(getLoc)("milestone_14")); mode;
    user.milestone = (user.milestone | w(17))
  }
  if(user.playCount.taiko >= 500 && (w(18) & user.milestone) == 0n){
    user.giveXP(250, message)

    const mode = eval(getLoc)("taiko")
    user.modificators.push(new modificator("500_std_taiko", "mult_XP_taiko", 1.1))
    message.addResponse(eval(getLoc)("milestone_15")); mode;
    user.milestone = (user.milestone | w(18))
  }

  if(user.playCount.taiko >= 1000 && (w(19) & user.milestone) == 0n){
    user.giveXP(500, message)

    const mode = eval(getLoc)("taiko")
    const obtainedWaifu = new waifu(user, waifus.get("33")) //Mocha
    user.reserveWaifu.push(obtainedWaifu)
    message.addResponse(eval(getLoc)("milestone_16")); mode;
    user.milestone = (user.milestone | w(19))
  }

  /*if(user.playCount.fruits >= 50 && (w(20) & user.milestone) == 0n){
    user.giveXP(25, message)

    const mode = eval(getLoc)("catch")
    user.items.addItem('19'); user.items.addItem('14')
    message.addResponse(eval(getLoc)("milestone_13")); mode;
    user.milestone = (user.milestone | w(20))
  }*/
  if(user.playCount.fruits >= 100 && (w(21) & user.milestone) == 0n){
    user.giveXP(50, message)
    const mode = eval(getLoc)("catch")
    user.items.addItem('23')
    message.addResponse(eval(getLoc)("milestone_14")); mode;
    user.milestone = (user.milestone | w(21))
  }
  if(user.playCount.fruits >= 500 && (w(22) & user.milestone) == 0n){
    user.giveXP(250, message)
    const mode = eval(getLoc)("catch")
    user.modificators.push(new modificator("500_std_fruits", "mult_XP_catch", 1.1))
    message.addResponse(eval(getLoc)("milestone_15")); mode;
    user.milestone = (user.milestone | w(22))
  }
  if(user.playCount.fruits >= 1000 && (w(23) & user.milestone) == 0n){
    user.giveXP(500, message)
    const mode = eval(getLoc)("catch")
    const obtainedWaifu = new waifu(user, waifus.get("32")) //Yuzu
    user.reserveWaifu.push(obtainedWaifu)
    message.addResponse(eval(getLoc)("milestone_16")); mode;
    user.milestone = (user.milestone | w(23))
  }

  /*if(user.playCount.mania >= 50 && (w(24) & user.milestone) == 0n){
    user.giveXP(25, message)
    const mode = eval(getLoc)("mania")
    user.items.addItem('19'); user.items.addItem('14')
    message.addResponse(eval(getLoc)("milestone_13")); mode;
    user.milestone = (user.milestone | w(24))
  }*/
  if(user.playCount.mania >= 100 && (w(25) & user.milestone) == 0n){
    user.giveXP(50, message)
    const mode = eval(getLoc)("mania")
    user.items.addItem('23')
    message.addResponse(eval(getLoc)("milestone_14")); mode;
    user.milestone = (user.milestone | w(25))
  }
  if(user.playCount.mania >= 500 && (w(26) & user.milestone) == 0n){
    user.giveXP(250, message)
    const mode = eval(getLoc)("mania")
    user.modificators.push(new modificator("500_std_mania", "mult_XP_mania", 1.1))
    message.addResponse(eval(getLoc)("milestone_15")); mode;
    user.milestone = (user.milestone | w(26))
  }

  if(user.playCount.mania >= 1000 && (w(27) & user.milestone) == 0n){
    user.giveXP(500, message)
    const mode = eval(getLoc)("mania")
    const obtainedWaifu = new waifu(user, waifus.get("31")) //Maria
    user.reserveWaifu.push(obtainedWaifu)
    message.addResponse(eval(getLoc)("milestone_16")); mode;
    user.milestone = (user.milestone | w(27))
  }

  if(user.playCount.mania >= 100 && user.playCount.fruits >= 100 && user.playCount.osu >= 100 && user.playCount.taiko >= 100 && (w(33) & user.milestone) == 0n){
    user.giveXP(400, message)

    message.addResponse(eval(getLoc)("milestone_22"))
    const obtainedWaifu = new waifu(user, waifus.get("42")) //Alice Zuberg

    obtainedWaifu.modificators.push(new modificator("100_play_in_each_mod", "mult_XP_taiko", 1.1),
    new modificator("100_play_in_each_mod", "mult_XP_catch", 1.1),
    new modificator("100_play_in_each_mod", "mult_XP_mania", 1.1),
    new modificator("100_play_in_each_mod", "mult_XP_std", 1.1))

    user.reserveWaifu.push(obtainedWaifu)
    user.milestone = (user.milestone | w(33))
  }

  if(user.waifuManager.haveAllOsu && (w(28) & user.milestone) == 0n){
    user.giveXP(4000, message)

    user.modificators.push(new modificator("have_all_osu", "mult_dext", 1.1),
    new modificator("have_all_osu", "mult_XP", 1.1),
    new modificator("have_all_osu", "mult_int", 1.1))
    user.items.addItem('51') //perfect circle
    message.addResponse(eval(getLoc)("milestone_17"))
    user.milestone = (user.milestone | w(28))
  }

  if(user.quests.totalQuestDone >= 10 && (w(29) & user.milestone) == 0n){
    user.giveXP(50, message)

    user.items.addItem('23')
    message.addResponse(eval(getLoc)("milestone_18"))
    user.milestone = (user.milestone | w(29))
  }
  if(user.quests.totalQuestDone >= 20 && (w(30) & user.milestone) == 0n){
    user.giveXP(100, message)

    user.modificators.push(new modificator("20_quests", "mult_money_earned", 1.05))
    message.addResponse(eval(getLoc)("milestone_19"))
    user.milestone = (user.milestone | w(30))
  }
  if(user.quests.totalQuestDone >= 50 && (w(31) & user.milestone) == 0n){
    user.giveXP(250, message)

    user.modificators.push(new modificator("50_quests", "mult_XP", 1.1))
    message.addResponse(eval(getLoc)("milestone_20"))
    user.milestone = (user.milestone | w(31))
  }
  if(user.quests.totalQuestDone >= 100 && (w(32) & user.milestone) == 0n){
    user.giveXP(500, message)

    const obtainedWaifu = new waifu(user, waifus.get("43")) //Quinella
    obtainedWaifu.modificators.push(new modificator("100_quests", "get_quest_reroll", 1.1))
    user.reserveWaifu.push(obtainedWaifu)
    message.addResponse(eval(getLoc)("milestone_21"))
    user.milestone = (user.milestone | w(32))
  }


  /*if(user.totalClaims >= 727 && (w(33) & user.milestone) == 0n){

    message.addResponse(eval(getLoc)("milestone_22"))
    user.milestone = (user.milestone | w(33))
  }*/

  if(mileStoneState != user.milestone){
    user.save()
    message.reply()
  }
}
