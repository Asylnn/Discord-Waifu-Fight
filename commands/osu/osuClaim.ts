import message from '../../class/message'
import user from '../../class/user'
import giveClaimXP from './giveClaimXP'


export default async function claim_std(message: message, user: user){
  const mode = "std"
  const scores = await osuAPI.getUserScores({userId: user.osuId, type:"recent", gamemode:"osu", limit:10})

  console.log("user found! : " + user.osuName)
  console.log(scores)
  const allScoreInfo = scores.find(score => score.beatmap.id == user.fight.beatmapId)
  if(!allScoreInfo){message.reply(eval(getLoc)("beatmap_not_done")); return true;}

  user.playCount.osu++
  const scoreDetails = {
    length:allScoreInfo.beatmap.total_length,
    accuracy:allScoreInfo.accuracy,
    maxCombo:allScoreInfo.max_combo,
    maxComboMap:allScoreInfo.beatmap.count_circles + allScoreInfo.beatmap.count_sliders*2 + allScoreInfo.beatmap.count_spinners,
    stars:allScoreInfo.beatmap.difficulty_rating
  }
  console.log(scoreDetails)
  let multiplicator = user.multXP
  user.multXP = 1

  if(allScoreInfo.mods.includes("DT") || allScoreInfo.mods.includes("NC")){scoreDetails.stars *= 1.35; scoreDetails.length /= 1.5}
  if(allScoreInfo.mods.includes("HF")){scoreDetails.stars *= 1/1.35; scoreDetails.length *= 1.5}
  if(allScoreInfo.mods.includes("FL")){multiplicator *= 1 + (-1.5 + Math.pow(1.5, scoreDetails.stars))*(Math.min(1.5, allScoreInfo.max_combo/200))}
  if(allScoreInfo.mods.includes("HD")){multiplicator *= 1.08}
  if(allScoreInfo.mods.includes("EZ") ){multiplicator *= 0.58*Math.pow(1.15, scoreDetails.stars)}
  if(allScoreInfo.mods.includes("HR")){multiplicator *= 1.4}
  if(allScoreInfo.mods.includes("SO")){
    message.reply("SPUNOUT ? wut")
  }


    multiplicator *= (scoreDetails.length/100)*Math.pow(1.02337, scoreDetails.length/60)
    console.log("multiplicator : " + multiplicator)
    /*if(scoreDetails.accuracy >= 0.999 && (2n & user.milestone) == 0n){
      try {
        user.reserveWaifu.push(new waifu(user, waifus.get("Tanya Degurechaff")))
        message.reply(eval(getLoc)("milestone_2"))
        user.milestone = (user.milestone | 2n)
      } catch (e) {
        console.log(e)
      }
    }*/
    /*if(scoreDetails.accuracy >= 0.90 && allScoreInfo.mods.includes("Flashlight") && scoreDetails.stars >= 4 && (64 & user.milestone) == 0){
      user.addItem(itemsCol.get(23)) //EVO gem
      message.reply(eval(getLoc)("milestone_6"))
      user.milestone = (user.milestone | 64)
    }*/
    let rawXP = Math.floor(16*Math.pow(1.6, scoreDetails.stars)*Math.pow(scoreDetails.accuracy, 2.5)*multiplicator*Math.sqrt(scoreDetails.maxCombo/scoreDetails.maxComboMap))
    giveClaimXP(message, user, rawXP, mode)

}
