import Discord from 'discord.js'
import {TEST_BUILD, IDLE_TIME_OF_INTERACTIONS} from '../files/config.json'
import waifu from './waifu'
type messageType = 'osu' | "DM" | 'GUILD_TEXT' | 'GUILD_NEWS' | 'interaction' | Discord.ThreadChannelTypes
import checkClicker from '../commands/util/checkClicker'
//import turnPage from '../commands/util/turnPage'


export default class globalMessage{
  public lg: string
  public readonly content: string
  public authorId: string = "-1"
  public readonly type: messageType
  public readonly createdTimestamp: number
  public channel: any
  public ephemeral: boolean
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

  reply(additionnalContent = "", ephemeral = true){
    this.addResponse(additionnalContent)
    const messageReplyOptions = {
      content:this.response + " ",
      embeds:this.embeds,
      components:this.components,
    };



    if((!this.hasReplied || this.channel.id == eventDiscordChannel.id) && !this.hasReplied){

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
      if(this.type == "DM"){
        this.channel.dmChannel.messages.fetch(this.id).then((message:Discord.Message) => message.edit(messageReplyOptions))
      }
      else {
        this.channel.update(messageReplyOptions)
      }
    }
  }

  async createPageInteraction(numberOfPages:number, createEmbed:(page:number, interaction?:Discord.ButtonInteraction) => Discord.MessageEmbed){
    if(!numberOfPages) numberOfPages = 1
    this.addButton("pageLeft", "<<", "PRIMARY")
    this.addButton("pageRight", ">>", "PRIMARY")
    let page = 1
    this.embeds[0] = createEmbed(page)
    this.embeds[0].setFooter(`Page ${page}/${numberOfPages}`)

    const collector = (await this.reply()).createMessageComponentCollector({componentType:'BUTTON', idle:IDLE_TIME_OF_INTERACTIONS})
    collector.on('collect', (interaction: Discord.ButtonInteraction) => {
      if(checkClicker(interaction, this.authorId)) return true;
      if(interaction.customId == "pageLeft" || interaction.customId == "pageRight"){
        interaction.customId == "pageLeft" ? page-- : page++
        if(page == numberOfPages + 1) page = 1
        else if(page == 0) page = numberOfPages
        this.embeds[0] = createEmbed(page, interaction)
        this.embeds[0].setFooter(`Page ${page}/${numberOfPages}`)
        interaction.update({embeds:this.embeds, content:" "})
      }
      else createEmbed(page, interaction)

    })
    return true
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
