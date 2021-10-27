import message from '../../class/message'


export default async function claim_catch(message: message, osuId: number, beatmapId: number){
  const scores = await osuAPI.getUserScores({userId: osuId, type:"recent", gamemode:"osu", limit:10})

  console.log("user found! : " + osuId)

  const allScoreInfo = scores.find(score => score.beatmap.id == beatmapId)
  if(!allScoreInfo){message.addResponse(eval(getLoc)("beatmap_not_done")); return 0;}

  const scoreDetails = {
    length:allScoreInfo.beatmap.total_length,
    accuracy:allScoreInfo.accuracy,
    maxCombo:allScoreInfo.max_combo,
    maxComboMap:allScoreInfo.beatmap.count_circles + allScoreInfo.beatmap.count_sliders + allScoreInfo.beatmap.count_spinners,
    stars:allScoreInfo.beatmap.difficulty_rating
  }
  console.log(scoreDetails)
  let multiplicator = 1

    if(allScoreInfo.mods.includes("FL")){multiplicator *= 3.5}
    if(allScoreInfo.mods.includes("HD")){multiplicator *= 1.15}
    if(allScoreInfo.mods.includes("EZ")){multiplicator *= 1.2}
    if(allScoreInfo.mods.includes("HR")){multiplicator *= 1.4}
    if(allScoreInfo.mods.includes("DT")){multiplicator *= 1.7}
    if(allScoreInfo.mods.includes("HF")){multiplicator *= 0.66}
    if(allScoreInfo.mods.includes("SO")){
      message.addResponse("SPUNOUT ? wut")
    }


    multiplicator *= scoreDetails.length/100
    console.log("multiplicator : " + multiplicator)
    /*if(scoreDetails.accuracy >= 0.999 && (2 & user.milestone) == 0){
      user.reserveWaifu.add(new userWaifu(getWaifuByName("Tanya Degurechaff")))
      message.addResponse(eval(getLoc)("milestone_2"))
      user.milestone = (user.milestone | 2)
    }*/
    return Math.floor(25*Math.pow(1.7, scoreDetails.stars - 1)*scoreDetails.maxCombo*Math.pow(scoreDetails.accuracy, 2)*multiplicator/scoreDetails.maxComboMap)
}
