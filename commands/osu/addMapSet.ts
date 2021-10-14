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
      message.addResponse("Beatmap ajoutée !")
    }
    else {
      message.addResponse("La beatmap est déjà ajoutée")
    }
  }).catch(function(){message.addResponse("La map n'a pas été trouvé :/")})
}

function removemap(message, user, Smessage){
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 12; j++) {
      for (var k = 0; k < beatmapsids[i.toString()][j.toString()].length; k++) {
        if(beatmapsids[i.toString()][j.toString()][k][1] == Smessage[1]){
          beatmapsids[i.toString()][j.toString()].splice(k, 1)
          message.addResponse("La beatmap à été enlevé")
        }
      }
    }
  }
}*/

import message from '../../class/message'

export default async function addmapset(message: message, args: Array<string>){
  const beatmapset = await osuAPI.getBeatmapSet({beatmapsetId:parseInt(args[1])})
  if(!beatmapset) {message.addResponse("Le set de map n'a pas été trouvé :/"); return true};
  beatmapset.beatmaps.forEach(async beatmap =>  {
    const beatmapId = beatmap.id
    const beatmapStarRating = Math.floor(beatmap.difficulty_rating)

    const beatmapArray = await beatmaps.get(beatmap.mode + beatmapStarRating)

    if(!beatmapArray.some(beatmapInfo => beatmapInfo.id == beatmapId)){ //If the map already exists
      beatmapArray.push({beatmapSetId:beatmap.beatmapset_id, id: beatmap.id, genre:beatmapset.genre.name, language: beatmapset.language.name, mapGenre:"no_genre"})
    }
    else {
      console.log("Cette beatmap est déja ajoutée!")
    }
  });
  message.addResponse("Beatmaps ajoutées !")
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
  message.addResponse("Le set à bien été enlevé!")
}*/
