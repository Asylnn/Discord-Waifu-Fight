import commands from './commands/commands'
import messageReaction from './commands/messageReaction'
import {USERNAME, ASYLN_DISCORD_ID, PREFIX} from './files/config.json'
import user from './class/user'
import messageClass from "./class/message"
import Discord from 'discord.js'
import addbeatmapset from './commands/osu/addMapSet'











discordClient.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand() && !interaction.isContextMenu()) return;
  const message = new messageClass(defaultLanguage, "interaction no content", "interaction", interaction.createdTimestamp, interaction, interaction.id)
  let userObj: user = {currentDealId:"-1", lg:defaultLanguage, id:interaction.user.id, verified:false, osuName:"-"} as any

   if(await users.exists(interaction.user.id)){
    userObj = await users.get(interaction.user.id)
  }
  commands(message, userObj, [], interaction)
})

discordClient.on('messageCreate', async function(discordMessage: Discord.Message) {
  if(discordMessage.author.bot) return;
  console.log(discordMessage.content)
  const message = new messageClass(defaultLanguage, discordMessage.content, discordMessage.channel.type, discordMessage.createdTimestamp, discordMessage.channel, discordMessage.id)
  const np = message.content.split('/b/')
  if(np[1]){
    const beatmapID = +(np[1].split(' '))[0]
    const beatmap = await osuAPI.getBeatmap({beatmapId:beatmapID})
    beatmap.beatmapset_id
    addbeatmapset(message, [beatmap.beatmapset_id.toString()])
  }
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
  const message = new messageClass(defaultLanguage, osuMessage.message, "osu", Date.now(),osuMessage.user, "-1")
  let userObj: user = {currentDealId:"-1", lg:defaultLanguage, id:"-1", verified:false, osuName:osuMessage.user.ircUsername} as any

  if(osuMessage.user.ircUsername == USERNAME){return;} // If it comes from the bot itself return.
  const args = message.content.toLowerCase().split(' ');
  if(!message.content.toLowerCase().startsWith(PREFIX)) return;



  const user = await users.find(user => user.osuName == userObj.osuName)
  if(user != undefined){
    userObj = user
  }
  commands(message, userObj, args, osuMessage)
});
