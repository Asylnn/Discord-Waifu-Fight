import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS, TEST_BUILD, IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'
import Discord from 'discord.js'
import getParameterObject from '../util/getParameterObject'
import checkClicker from '../util/checkClicker'

commandManager.create({
  name:"upgrade",
  type:"CHAT_INPUT",
  description:"Upgrade a waifu",
  options:[
    {
      name:"w",
      description:"waifu slot -- Which waifu will be upgraded (no input will open select menu)",
      required:false,
      type:"INTEGER"
    }
  ],
})

export default async function upgradewaifu(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  if(user.lvl < LEVEL_PERMISSIONS.upgrade && !TEST_BUILD){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}

  const waifu = await getParameterObject(message, user, args[1], interaction, "waifu")
  if(!waifu){return true;}
  //let waifu = user.waifus[waifuIndex]
  const cost = Math.floor((50 + waifu.rarity*50)*waifu.stars)
  if(waifu.stars >= waifu.rarity + 1){message.addResponse(eval(getLoc)("upgrade_waifu_max")); return true;}
  if(cost > user.money){message.addResponse(eval(getLoc)("upgrade_waifu_insufficient_money")); return true;}
  //if(args[2] != "c"){message.addResponse(eval(getLoc)("upgrade_waifu_confirm")); return true;}

  const actionRow = new Discord.MessageActionRow()
  const selectMenu = new Discord.MessageSelectMenu()
  selectMenu.setCustomId('waifu')
  selectMenu.setPlaceholder('Select A Waifu')
  let arrIndex : number[] = []
  const options: Array<Discord.MessageSelectOptionData> = user.reserveWaifu.filter((reserveWaifu, i) =>
  {
    if(reserveWaifu.id == waifu.id){
      arrIndex.push(i)
      return true
    }
  }).map((reserveWaifu, i) =>
    {
      return {
      label:`${reserveWaifu.name} LV ${reserveWaifu.lvl} ${"★".repeat(reserveWaifu.stars)}`,
      value:arrIndex[i].toString()
    }
  })

  const validsyringe = user.items.material.filter(({item}) => item.id == "78" && item.complementaryInformation == waifu.id)
  const validDoll = user.items.material.filter(({item}) => item.id == "79" && item.complementaryInformation == waifu.id)
  if(validsyringe.length >= 1 && validDoll.length >= 1){
    options.push({
      label:eval(getLoc)("use_doll_syringe"),
      value:"dupe"
    })
  }

  if(options.length == 0){message.addResponse(eval(getLoc)("no_duplicate_waifu")); return true;}


  selectMenu.setOptions(options)
  actionRow.addComponents(selectMenu)
  message.components.push(actionRow)

  message.addResponse(eval(getLoc)("upgrade_waifu_confirm"))
  const collector = (await message.reply("Please select a waifu to barrier break")).createMessageComponentCollector({componentType:'SELECT_MENU', idle:IDLE_TIME_OF_INTERACTIONS})


  collector.on('collect', (interaction: Discord.SelectMenuInteraction) => {
    message.channel = interaction
    message.haveToUpdate = true
    if(interaction.values[0] == "dupe"){
      user.items.removeItem(validsyringe[0].item, 1)
      user.items.removeItem(validDoll[0].item, 1)
    }
    else
      user.reserveWaifu.splice(+interaction.values[0], 1)

    user._money -= cost
    waifu.stars++
    waifu.b_luck += 3*waifu.u_luck
    waifu.b_agi += 3*waifu.u_agi
    waifu.b_int += 3*waifu.u_int
    waifu.b_dext += 3*waifu.u_dext
    waifu.b_stg += 3*waifu.u_stg
    waifu.b_kaw += 3*waifu.u_kaw
    message.reply(eval(getLoc)("upgrade_waifu"))
    if(checkClicker(interaction, user.id)) return true;
    collector.stop()
    user.save()
  })
  return true;
}
