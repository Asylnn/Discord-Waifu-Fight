import message from '../../class/message'



export default async function osuClaim(message: message, osuId: number, beatmapId: number){
  if(!osuId){message.addResponse(eval(getLoc)("no_osu_id")); return 0}
  const scores = await osuAPI.getUserScores({userId: osuId, type:"recent", gamemode:"osu", limit:10})

  console.log("user found! : " + osuId)
  console.log(scores)
  const allScoreInfo = scores.find(score => score.beatmap.id == beatmapId)
  if(!allScoreInfo){message.addResponse(eval(getLoc)("beatmap_not_done")); return 0}


  const scoreDetails = {
    length:allScoreInfo.beatmap.total_length,
    accuracy:allScoreInfo.accuracy,
    maxCombo:allScoreInfo.max_combo,
    maxComboMap:allScoreInfo.beatmap.count_circles + allScoreInfo.beatmap.count_sliders*2 + allScoreInfo.beatmap.count_spinners,
    stars:allScoreInfo.beatmap.difficulty_rating
  }
  console.log(scoreDetails)
  let multiplicator = 1

  if(allScoreInfo.mods.includes("DT") || allScoreInfo.mods.includes("NC")){scoreDetails.stars *= 1.35; scoreDetails.length /= 1.5}
  if(allScoreInfo.mods.includes("HF")){scoreDetails.stars *= 1/1.35; scoreDetails.length *= 1.5}
  if(allScoreInfo.mods.includes("FL")){multiplicator *= 1 + (-1.5 + Math.pow(1.5, scoreDetails.stars))*(Math.min(1.5, allScoreInfo.max_combo/200))}
  if(allScoreInfo.mods.includes("HD")){multiplicator *= 1.08}
  if(allScoreInfo.mods.includes("EZ")){multiplicator *= 0.58*Math.pow(1.15, scoreDetails.stars)}
  if(allScoreInfo.mods.includes("HR")){multiplicator *= 1.4}
  if(allScoreInfo.mods.includes("SO")){
    message.addResponse("SPUNOUT ? wut")
  }


    multiplicator *= (scoreDetails.length/90)*Math.pow(1.02337, scoreDetails.length/60)
    console.log("multiplicator : " + multiplicator)
    /*if(scoreDetails.accuracy >= 0.999 && (2n & user.milestone) == 0n){
      try {
        user.reserveWaifu.push(new waifu(user, waifus.get("Tanya Degurechaff")))
        message.addResponse(eval(getLoc)("milestone_2"))
        user.milestone = (user.milestone | 2n)
      } catch (e) {
        console.log(e)
      }
    }*/
    /*if(scoreDetails.accuracy >= 0.90 && allScoreInfo.mods.includes("Flashlight") && scoreDetails.stars >= 4 && (64 & user.milestone) == 0){
      user.addItem(itemsCol.get(23)) //EVO gem
      message.addResponse(eval(getLoc)("milestone_6"))
      user.milestone = (user.milestone | 64)
    }*/
    return Math.floor(16*Math.pow(1.6, scoreDetails.stars)*Math.pow(scoreDetails.accuracy, 2.5)*multiplicator*Math.sqrt(scoreDetails.maxCombo/scoreDetails.maxComboMap))
}
