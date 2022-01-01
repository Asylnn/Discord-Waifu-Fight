import Discord from 'discord.js'
import waifu from "./class/waifu"
import item from './class/item/item'
import osuAPI from './osuAPI/Api'
import collection from './class/collection'
import pageEmbed from './class/types/pageEmbed'
import dungeon from './class/dungeon'
import consumableUser from './class/item/userConsumable'
import consumableWaifu from './class/item/waifuConsumable'
import equipmentWaifu from './class/item/waifuEquipment'
import equipmentUser from './class/item/userEquipment'
import materials from './class/item/material'
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
  var uniqueId: string
}


import load from './load'
load()

import save from './save'


if(!TEST_BUILD){ //Auto Save every 5 minutes if it's not a test build.
  setInterval(function(){
    save().catch(err => console.log(err))
  }, 120000)
}
