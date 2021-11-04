import Discord from 'discord.js'
import {TEST_BUILD} from '../files/config.json'
import waifu from './waifu'
type messageType = 'osu' | "DM" | 'GUILD_TEXT' | 'GUILD_NEWS' | 'interaction' | Discord.ThreadChannelTypes


export default class globalMessage{
  public lg: string
  public readonly content: string
  //public readonly author: {o, id}
  public readonly type: messageType
  public readonly createdTimestamp: number
  public channel: any
  public readonly ephemeral: boolean
  public id: string
  public response = ""
  public embeds: Array<Discord.MessageEmbed> = []
  public hasReplied = false
  public haveToUpdate = false
  public components: Array<Discord.MessageActionRow> = []

  constructor(lg: string, content:string, type: messageType, createdTimestamp: number, channel: any, id: string, ephemeral = !TEST_BUILD){
    this.lg = lg
    this.content = content
    this.type = type
    this.createdTimestamp = createdTimestamp
    this.channel = channel
    this.id = id
    this.ephemeral = ephemeral
  }

  get isInteraction(){
    return this.type == "interaction"
  }

  addResponse(content: string){
    if(content) /*If it's not an empty string*/ this.response += content + "\r\n"
  }

  addButton(id:string, label:string, style: Discord.MessageButtonStyleResolvable){
    if(!this.components.length){ //If array empty
      this.components.push(new Discord.MessageActionRow())
    }
    this.components[0].addComponents(new Discord.MessageButton().setCustomId(id).setLabel(label).setStyle(style))
  }

  addWaifuSelectMenu(waifus: (waifu | null)[]){
    const actionRow = new Discord.MessageActionRow()
    const selectMenu = new Discord.MessageSelectMenu()
    selectMenu.setCustomId('waifuselect')
    selectMenu.setPlaceholder('Select A Waifu')
    let options: Array<Discord.MessageSelectOptionData> = []
    waifus.forEach((waifu, i) => {
      if(waifu){
        options.push({
          label:`${i + 1} - ${waifu.name}`,
          value:i.toString()
        })
      }
    })
    selectMenu.setOptions(options)
    actionRow.addComponents(selectMenu)
    this.components.push(actionRow)
  }

  reply(additionnalContent:string = " ", ephemeral = true){
    this.addResponse(additionnalContent)
    const messageReplyOptions = {
      content:this.response,
      embeds:this.embeds,
      components:this.components,
    };

    if(!this.hasReplied || this.channel.id == eventDiscordChannel.id){

      this.hasReplied = true
      this.response = ""

      if(this.type == "osu"){
        this.channel.sendMessage(this.response)
      }
      else if(this.type == "DM"){
        return this.channel.send(messageReplyOptions)
      }
      else if(this.type == "GUILD_TEXT"){
        return this.channel.send(messageReplyOptions)
      }
      else if(this.type == 'interaction'){
        const interactionReplyOptions = {
          ephemeral:ephemeral && this.ephemeral,
          fetchReply:true
        }
        return this.channel.reply({...interactionReplyOptions, ...messageReplyOptions})
      }
    }
    else if(this.haveToUpdate){
      this.channel.update(messageReplyOptions)
    }
  }

  /*edit(messageId:string = "", content: string = ""){
    if(this.type == "DM"){
      this.channel.messages.fetch(messageId).then((message:Discord.Message) => message.edit({embeds:[content]}))
    }
    else if(this.type == "GUILD_TEXT"){
      this.channel.messages.fetch(messageId).then((message:Discord.Message) => message.edit({embeds:[content]}))
    }
    else if(this.type == 'interaction'){
      this.channel.editReply({
        content:this.response + " ",
        embeds:this.embeds,
        ephemeral:this.ephemeral,
        components:this.components,
        fetchReply:true
      })
    }
  }*/

}
