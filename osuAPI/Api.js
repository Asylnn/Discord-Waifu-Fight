const axios = require('axios')
const OSU_API_URL = "https://osu.ppy.sh/api/v2/"

class api {
  constructor(clientId, clientSecret){
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.accessToken = ""

    this.requestInfo = {
      client_id:this.clientId,
      client_secret:this.clientSecret,
      grant_type:"client_credentials",
      scope:"public"
    }

    this.getToken()
    //console.log ?
    setInterval(this.getToken, 86370000)

  }

  async getToken(){
    try {
      const axiosRes = await axios.post("https://osu.ppy.sh/oauth/token", this.requestInfo)
      this.accessToken = axiosRes.data.access_token
    }
    catch (err) {
      throw new Error('wrong client id / secret');
    }
  }

  async apiCall(url, urlParams, queryParams){

    const urlLength = url.split("#").length - 1
    for(let i = 0; i < urlLength; i++){
      url = url.replace(`#${i}`, urlParams[i])
    }

    const requestInfo = {
      params:queryParams,
      headers:{'authorization':`Bearer ${this.accessToken}`}
    }

    try {
      console.log(OSU_API_URL + url)
      const axiosRes = await axios.get(OSU_API_URL + url, requestInfo)
      return axiosRes.data
    }
    catch (err) {
      console.log(err.message)
      return undefined
    }
  }


  async lookupBeatmap(params){ //checksum filename id
    const url = "beatmaps/lookup"
    if(!params.checksum || !params.filename || !params.id) throw new Error('not enough params')
    this.apiCall(url, [], params)
  }

  async getUserBeatmapScore({beatmapId, userId, gamemode}){
    const url = "beatmaps/#0/scores/users/#1"
    if(!beatmapId || !userId) throw new Error('not enough params')
    this.apiCall(url, [beatmapId, userId], {mode:gamemode})
  }

  async getBeatmapScores({beatmapId, gamemode}){
    const url = "beatmaps/#0/scores"
    if(!beatmapId) throw new Error('not enough params')
    return this.apiCall(url, [beatmapIds], {mode:gamemode})
  }

  async getBeatmap({beatmapId}){
    const url = "beatmaps/#0"
    if(!beatmapId) throw new Error('not enough params')
    return await this.apiCall(url, [beatmapId], {})
  }

  //get comments
  //get comment

  async searchUser(params){ //query and page
    url = "search"
    this.apiCall(url, [], {mode:"user", ...params})
  }

  async searchWiki(params){ //query and page
    url = "search"
    this.apiCall(url, [], {mode:"wiki_page", ...params})
  }

  async getRanking({gamemmode, type, country, cursor, filter, spotlight, performance}){
    const url = "rankings/#0/#1"
    if(!gamemmode || !type) throw new Error('not enough params')
    const params = {country:country, cursor:cursor, filter:filter, spotlight:spotlight, performance:performance}
    this.apiCall(url, [gamemode, type], params)
  }

  async getSpotlights(){
    const url = "spotlights"
    this.apiCall(url, [], {})
  }

  async getBeatmapSetEvents(){
    const url = "/beatmapsets/events"
    this.apiCall(url, [], {})
  }



  async getChangelog({stream, build}){
    let url = "changelog"
    if(!stream || !build){
      this.apiCall(url, [], {})
    }
    else{
      url = "changelog/#0/#1"
      if(stream && !build || !stream && build) throw new Error('not enough params')
      this.apiCall(url, [steam, build], {})
    }
  }

  //get changelog/{changelog} ??

  async getMatch({matchId}){
    let url = "matches"
    if(!matchId){
      this.apiCall(url, [], {})
    }
    else{
      url = "matches/#0"
      this.apiCall(url, [matchId], {})
    }
  }

  async getRooms({gamemode}){
    const url = "rooms/#0"
    if(!gamemode) throw new Error('not enough params')
    this.apiCall(url, [gamemode], {})
  }

  async getRoom({roomId}){
    const url = "rooms/#0"
    if(!roomId) throw new Error('not enough params')
    this.apiCall(url, [roomId], {})
  }

  async getRoomLeaderBoard({roomId}){
    const url = "rooms/#0"
    if(!roomId) throw new Error('not enough params')
    this.apiCall(url, [roomId], {})
  }

  async getRoomScores({roomId, playlistId, limit, sort, cursor}){ //get multiplayer scores need to recheck
    const url = "rooms/#0/playlist/#1/scores" //what is sort and cursor ?
    if(!roomId || !playlistId) throw new Error('not enough params')
    this.apiCall(url, [roomId, playlistId], {limit:limit, sort:sort, cursor:cursor})
  }

  async getRoomScore({roomId, playlistId, scoreId}){
    const url = "rooms/#0/playlist/#1/scores/#2"
    if(!roomId || !playlistId || !scoreId) throw new Error('not enough params')
    this.apiCall(url, [roomId, playlistId, scoreId], {})
  }

  async getSeasonalBackgrounds(){
    const url = "seasonal-backgrounds"
    this.apiCall(url, [], {})
  }

  async downloadReplay({gammode, scoreId}){
    const url = "scores/#0/#1/download"
    if(!gammode || !scoreId) throw new Error('not enough params')
    this.apiCall(url, [roomId, scoreId], {})
  } //?

  async getScore({gamemode, scoreId}){
    const url = "scores/#0/#1/download"
    if(!gammode || !scoreId) throw new Error('not enough params')
    this.apiCall(url, [gamemode, scoreId], {})
  }

  async searchBeatmapset({/*filters?*/}){

  }

  async lookupBeatmapset(params){//checksum filename id
    const url = "beatmapsets/lookup"
    if(!params.checksum || !params.filename || !params.id) throw new Error('not enough params')
    this.apiCall(url, [], params)
  }

  async getBeatmapSet({beatmapsetId}){
    const url = "beatmapsets/#0"
    if(!beatmapsetId) throw new Error('not enough params')
    return this.apiCall(url, [beatmapsetId], {})
  }


  async getNews({news}){
    let url = "news"
    if(!news){
      this.apiCall(url, [], {})
    }
    else{
      url = "news/#0"
      this.apiCall(url, [news], {})
    }
  }

  async getUserKudosu({userId, limit, offset}){
    const url = "users/#0/kudosu"
    if(!userId) throw new Error('not enough params')
    this.apiCall(url, [userId], {limit:limit, offset:offset})
  }

  async getUserScores({userId, type, includeFails, gamemode, limit, offset}){
    const url = "users/#0/scores/#1"
    if(!userId || !type) throw new Error('not enough params')
    const include_fails = includeFails ? "1" : "0"
    const queryParams = {include_fails:includeFails}
    if (gamemode) queryParams.gamemode = gamemode
    if (gamemode) queryParams.limit = limit
    if (gamemode) queryParams.offset = offset

    return this.apiCall(url, [userId, type], queryParams)
  }

  async getUserBeatmaps({userId, type, limit, offset}){
    const url = "users/#0/beatmapsets/#1"
    if(!userId || !type) throw new Error('not enough params')
    this.apiCall(url, [userId, type], {limit:limit, offset:offset})
  }

  async getUserActivity({userId, limit, offset}){
    const url = "users/#0/beatmapsets/#1"
    if(!userId) throw new Error('not enough params')
    this.apiCall(url, [userId], {limit:limit, offset:offset})
  }

  async getUser({userId, gamemode}){
    const url = "users/#0/#1"
    if(!userId) throw new Error('not enough params')
    this.apiCall(url, [userId, gamemode], {})
  }

  async getWikiPage({locale, path}){
    /*const url = "users/#0/#1"
    if(!userId) throw new Error('not enough params')
    this.apiCall(url, [userId, gamemode], {})*/
  }

}

module.exports = api
