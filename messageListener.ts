import commands from './commands/commands'
import messageReaction from './commands/messageReaction'
import {USERNAME, ASYLN_DISCORD_ID, PREFIX} from './files/config.json'
import user from './class/user'
import messageClass from "./class/message"
import Discord from 'discord.js'
import addbeatmapset from './commands/osu/addMapSet'

discordClient.on('messageReactionAdd', (reaction, user) => {
  if(!user.bot){
    if(reaction.message.channel.id == '709807051060019270' || reaction.message.channel.id == '672515818025779220' || reaction.message.channel.id == '689575655704100941' ||  reaction.message.channel.id == '688415622601638010' || reaction.message.channel.id == '705907776135757914' || reaction.message.channel.id == '705907805210542201'){
      messageReaction(reaction, user.id).catch(err => {
        console.log(err)
        reaction.message.channel.send(`ERROR : ${err.toString()} <@${ASYLN_DISCORD_ID}>`)
      })
    }
  }
});


discordClient.on('message', async function(discordMessage: Discord.Message) {
  if(discordMessage.author.bot) return;
  const message = new messageClass(defaultLanguage, discordMessage.content, discordMessage.channel.type, discordMessage.createdTimestamp, discordMessage.channel, discordMessage.id)


  const args = message.content.toLowerCase().split(' ');
  if(!message.content.toLowerCase().startsWith(PREFIX)) return;
  let userObj: user = {currentDealId:"-1", lg:defaultLanguage, id:discordMessage.author.id, verified:false, osuName:"Asyln"} as any



   if(await users.exists(discordMessage.author.id)){
    userObj = await users.get(discordMessage.author.id)
  }
  commands(message, userObj, args, discordMessage)

})

osuBancho.on("PM", async (osuMessage: any) => {
  console.log(`${osuMessage.user.ircUsername}: ${osuMessage.message}`)
  if(osuMessage.user.ircUsername == USERNAME){return;}
  const message = new messageClass(defaultLanguage, osuMessage.message, "osu", Date.now(),osuMessage.user, "-1")
  let userObj: user = {currentDealId:"-1", lg:defaultLanguage, id:"-1", verified:false, osuName:osuMessage.user.ircUsername} as any
  const np = message.content.split('beatmapsets/')
  if(np[1]){
    const beatmapsetID = +(np[1].split('#/'))[0]
    console.log(beatmapsetID)
    if(beatmapsetID){
      addbeatmapset(message, ["69727", beatmapsetID.toString()])
    }
  }
  const args = message.content.toLowerCase().split(' ');
  if(!message.content.toLowerCase().startsWith(PREFIX)) return;



  const user = await users.find(user => user.osuName == userObj.osuName)
  if(user != undefined){
    userObj = user
  }
  commands(message, userObj, args, osuMessage)
});
