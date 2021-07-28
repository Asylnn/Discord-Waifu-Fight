import Discord from 'discord.js'
import waifu from "./class/waifu"
import item from './class/item/item'
import osuAPI from './osuAPI/Api'
import collection from './class/collection'
import pageEmbed from './class/types/pageEmbed'
import dungeon from './class/'





type deal = {proposer:{id:string, username:string}, price:number, object:waifu | item, amount: number}

declare global {
  var globalAuction: {item:item, price: number, higgestOffer:{username:string, id:string}}
  var userShop: Array<deal>

  var dealIdGenerator: number
  var day: number

  var en: any
  var fr: any

  var defaultLanguage: string
  var guild: Discord.Guild
  var pendingAccount: Array<{osuName:string, code:string, id:string}>
  var eventDiscordChannel: Discord.Channel
  var osuBancho: any
  var forceAuctionCompletion: boolean
  var discordClient: Discord.Client
  var getLoc: string
  var allPagesEmbed: collection<string, pageEmbed>
  var osuAPI: osuAPI
  var beatmapIds: {"osu":{[key:string]: [number, number][]}, "mania":{[key:string]: [number, number][]}, "fruits":{[key:string]: [number, number][]}, "taiko":{[key:string]: [number, number][]}}
  var activeDungeons: Map<string,dungeon>
}


import load from './load'
load()

import save from './save'

setInterval(function(){
  save().catch(err => console.log(err))
  console.log("save complete!")
}, 120000)
