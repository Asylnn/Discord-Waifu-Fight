import message from '../../class/message'
import user from '../../class/user'
import giveClaimXP from './giveClaimXP'

export default async function claim_catch(message: message, user: user){
  let mode = "catch"
  const scores = await osuAPI.getUserScores({userId: user.osuId, type:"recent", gamemode:"osu", limit:10})

  console.log("user found! : " + user.osuName)

  const allScoreInfo = scores.find(score => score.beatmap.id == user.fight.beatmapId)
  if(!allScoreInfo){message.reply(eval(getLoc)("beatmap_not_done")); return true;}

  user.playCount.fruits++
  const scoreDetails = {
    length:allScoreInfo.beatmap.total_length,
    accuracy:allScoreInfo.accuracy,
    maxCombo:allScoreInfo.max_combo,
    maxComboMap:allScoreInfo.beatmap.count_circles + allScoreInfo.beatmap.count_sliders + allScoreInfo.beatmap.count_spinners,
    stars:allScoreInfo.beatmap.difficulty_rating
  }
  console.log(scoreDetails)
  let multiplicator = user.multXP
  user.multXP = 1

    if(allScoreInfo.mods.includes("FL")){multiplicator *= 3.5}
    if(allScoreInfo.mods.includes("HD")){multiplicator *= 1.15}
    if(allScoreInfo.mods.includes("EZ")){multiplicator *= 1.2}
    if(allScoreInfo.mods.includes("HR")){multiplicator *= 1.4}
    if(allScoreInfo.mods.includes("DT")){multiplicator *= 1.7}
    if(allScoreInfo.mods.includes("HF")){multiplicator *= 0.66}
    if(allScoreInfo.mods.includes("SO")){
      message.reply("SPUNOUT ? wut")
    }


    multiplicator *= scoreDetails.length/100
    console.log("multiplicator : " + multiplicator)
    /*if(scoreDetails.accuracy >= 0.999 && (2 & user.milestone) == 0){
      user.reserveWaifu.add(new userWaifu(getWaifuByName("Tanya Degurechaff")))
      message.reply(eval(getLoc)("milestone_2"))
      user.milestone = (user.milestone | 2)
    }*/
    let rawXP = Math.floor(25*Math.pow(1.7, scoreDetails.stars - 1)*scoreDetails.maxCombo*Math.pow(scoreDetails.accuracy, 2)*multiplicator/scoreDetails.maxComboMap)
    giveClaimXP(message, user, rawXP, mode)
}
