import {GETLOC, GUILD_ID, OSU_CLIENT_SECRET, OSU_CLIENT_ID, DEFAULT_LANGUAGE, TOKEN, OSU_API_KEY, USERNAME, IRC_PASSWORD, EVENT_CHANNEL_ID/*, HOST, OSU_CLIENT_ID, PORT, OSULOGOURL, CONNECTTEXT, TIME_BETWEEN_SCORES_REQUEST*/} from './files/config.json'
import fr from './files/language/fr.json'
import en from './files/language/en.json'
import fs from 'fs'
import decode from './encoding/decode'
import Discord from 'discord.js'
import Banchojs from "bancho.js"
import api from './osuAPI/Api'
import checking from './checking/checking'
import collection from './class/collection'
//import convert from './convert'

export default async function load(){
  global.fr = fr
  global.en = en
  global.defaultLanguage = DEFAULT_LANGUAGE

  global.forceAuctionCompletion = false


  global.allPagesEmbed = new collection()
  global.getLoc = GETLOC
  global.osuBancho = new Banchojs.BanchoClient({ username: USERNAME, password: IRC_PASSWORD, limiterTimespan:60000, port: 6667, apiKey:OSU_API_KEY, limiterPrivate:270 });
  global.discordClient = new Discord.Client();
  global.discordClient.login(TOKEN)
  global.osuAPI = new api(OSU_CLIENT_ID, OSU_CLIENT_SECRET)
  global.day = (new Date()).getDate()

  fs.readFile('./files/beatmapsIds.json', (err, data) => {
    if(err) console.log(err)
    global.beatmapIds = JSON.parse(data.toString())
  })

  fs.readFile('./files/dealIdGenerator.json', (err, data) => {
    if(err) console.log(err)
    global.dealIdGenerator = parseInt(JSON.parse(data.toString()) + 100000)
  })
  fs.readFile('./files/globalAuction.json', (err, data) => {
    if(err) console.log(err)
    global.globalAuction = decode(data.toString())
  })
  fs.readFile('./files/userShop.json', (err, data) => {
    if(err) console.log(err)
    global.userShop = decode(data.toString())
  })
  global.pendingAccount = []

  osuBancho.connect().then(() => {
    console.log("We're online! Now listening for incoming messages.");
  });

  discordClient.on('ready', async () => {
    console.log(`Logged in as ${(discordClient.user as Discord.ClientUser).tag}!`);
    global.guild = await discordClient.guilds.fetch(GUILD_ID)
    global.eventDiscordChannel = guild.channels.cache.get(EVENT_CHANNEL_ID) as Discord.Channel
    checking()
  });

  require('./objectCreation')
  require('./database')
  require("./messageListener")

  //convert()
}
