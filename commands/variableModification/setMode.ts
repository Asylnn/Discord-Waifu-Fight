import message from '../../class/message'
import user from '../../class/user'
import gamemode from '../../class/types/gamemode'
import {IDLE_TIME_OF_INTERACTIONS} from '../../files/config.json'
import Discord from 'discord.js'

commandManager?.create({
  name:"gamemode",
  type:"CHAT_INPUT",
  description:"select a gamemode that would be used by default for fights, dungeons and quests"
})

export default async function setmode(message:message, user:user, args: Array<string>){
  const actionRow = new Discord.MessageActionRow()
  const selectMenu = new Discord.MessageSelectMenu()
  selectMenu.setCustomId('gamemode')
  selectMenu.setPlaceholder(eval(getLoc)("select_a_gamemode"))
  selectMenu.setOptions([{
    label:"standard",
    value:'osu'
  },{
    label:"catch",
    value:'fruits'
  },{
    label:'taiko',
    value:'taiko'
  },{
    label:"mania",
    value:'mania'
  }])
  actionRow.addComponents(selectMenu)
  message.components.push(actionRow)

  const collector = (await message.reply(eval(getLoc)("select_a_gamemode"))).createMessageComponentCollector({componentType:'SELECT_MENU', idle:IDLE_TIME_OF_INTERACTIONS})
  collector.on('collect', (interaction: Discord.SelectMenuInteraction) => {
    message.channel = interaction
    message.haveToUpdate = true
    user.gamemode = interaction.values[0] as gamemode
    message.reply(eval(getLoc)("gamemode_select"))
    user.save()
  })
  /*
  if(!["osu", "fruits", "taiko", "mania"].includes(args[1])){message.addResponse(eval(getLoc)('wrong_gamemode')); return true}
  user.gamemode = args[1] as gamemode
  message.addResponse(eval(getLoc)("gamemode_select"))*/
}
