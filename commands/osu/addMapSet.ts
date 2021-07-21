/*function addmap(message, user, Smessage){
  osuApi.getBeatmaps({ b: Smessage[1]  }).then(beatmap => {
    let gameMode = "0"
    switch(beatmap.mode){
        case "Standard":
          gameMode = "0"
          break;
        case "Taiko":
          gameMode = "1"
          break;
        case "Catch":
          gameMode = "2"
          break
        case "Catch the Beat":
          gameMode = "3"
          break;
      }
    if(!hasMap(gameMode, Math.floor(beatmap[0].difficulty.rating).toString(), beatmap[0].id)){
      beatmapsids[gameMode][(Math.floor(beatmap[0].difficulty.rating)).toString()].push([beatmap[0].beatmapSetId, beatmap[0].id])
      message.reply("Beatmap ajoutée !")
    }
    else {
      message.reply("La beatmap est déjà ajoutée")
    }
  }).catch(function(){message.reply("La map n'a pas été trouvé :/")})
}

function removemap(message, user, Smessage){
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 12; j++) {
      for (var k = 0; k < beatmapsids[i.toString()][j.toString()].length; k++) {
        if(beatmapsids[i.toString()][j.toString()][k][1] == Smessage[1]){
          beatmapsids[i.toString()][j.toString()].splice(k, 1)
          message.reply("La beatmap à été enlevé")
        }
      }
    }
  }
}*/

import message from '../../class/message'

export default async function addmapset(message: message, args: Array<string>){
  const beatmapset = await osuAPI.getBeatmapSet({beatmapsetId:parseInt(args[1])})
  if(!beatmapset) {message.reply("Le set de map n'a pas été trouvé :/"); return true};
  beatmapset.beatmaps.forEach(beatmap => {
    const beatmapId = beatmap.id
    const beatmapStarRating = Math.floor(beatmap.difficulty_rating)

    let beatmapAlreadyHere = false

    beatmapIds[beatmap.mode][beatmapStarRating].forEach(ids => {
      if(ids[1] == beatmapId)
        beatmapAlreadyHere = true
    })

    if(!beatmapAlreadyHere){
      beatmapIds[beatmap.mode][beatmapStarRating].push([beatmapset.id, beatmapId])
    }
    else {
      console.log("Cette beatmap est déja ajoutée!")
    }
  });
  message.reply("Beatmaps ajoutées !")
  return true
}

/*function removemapset(message, user, Smessage){
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 12; j++) {
      for (var k = 0; k < beatmapsids[i.toString()][j.toString()].length; k++) {
        if(beatmapsids[i.toString()][j.toString()][k.toString()][0] == Smessage[1]){
          beatmapsids[i.toString()][j.toString()].splice(k, 1)
          console.log("La beatmap à été enlevé")
        }
      }
    }
  }
  message.reply("Le set à bien été enlevé!")
}*/
