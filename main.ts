import Discord from 'discord.js'
import waifu from "./class/waifu"
import item from './class/item/item'
import osuAPI from './osuAPI/Api'
import collection from './class/collection'
import pageEmbed from './class/types/pageEmbed'
import dungeon from './class/dungeon'
import consumableUser from './class/item/consumableUser'
import consumableWaifu from './class/item/consumableWaifu'
import equipmentWaifu from './class/item/equipmentWaifu'
import equipmentUser from './class/item/equipmentUser'
import materials from './class/item/materials'
import {TEST_BUILD} from './files/config.json'




type shoppingItem = {proposer:{id:string, username:string}, price:number, object:waifu | equipmentWaifu | equipmentUser | consumableWaifu | consumableUser | materials, amount: number}

declare global {
  var globalAuction: {item:item, price: number, higgestOffer:{username:string, id:string}}
  var userShop: Array<shoppingItem>

  var dealIdGenerator: number
  var day: number

  var en: any
  var fr: any

  var defaultLanguage: string
  var guild: Discord.Guild
  var commandManager: Discord.GuildApplicationCommandManager
  var pendingAccount: Array<{osuName:string, code:string, id:string}>
  var eventDiscordChannel: Discord.Channel
  var osuBancho: any
  var forceAuctionCompletion: boolean
  var discordClient: Discord.Client
  var getLoc: string
  var allPagesEmbed: collection<string, pageEmbed>
  var osuAPI: osuAPI
  var activeDungeons: Map<string,dungeon>
}


import load from './load'
load()

import save from './save'


if(!TEST_BUILD){ //Auto Save every 5 minutes if it's not a test build.
  setInterval(function(){
    save().catch(err => console.log(err))
    console.log("save complete!")
  }, 120000)
}
