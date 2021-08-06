type messageType = 'osu' | "dm" | 'text' | 'news'
import Discord from 'discord.js'

export default class globalMessage{
  public lg: string
  public readonly content: string
  //public readonly author: {o, id}
  public readonly type: messageType
  public readonly createdTimestamp: number
  public readonly channel: any
  public id: string

  constructor(lg: string, content:string, type: messageType, createdTimestamp: number, channel: any, id: string){
    this.lg = lg
    this.content = content
    this.type = type
    this.createdTimestamp = createdTimestamp
    this.channel = channel
    this.id = id
  }
  reply(content: string | Discord.MessageEmbed){
    if(this.type == "osu"){
      this.channel.sendMessage(content)
    }
    else if(this.type == "dm"){
      return this.channel.send(content)
    }
    else{
      return this.channel.send(content)
    }
  }

  edit(content: Discord.MessageEmbed){
    return this.channel.messages.fetch(this.id).then((message:Discord.Message) => message.edit("", content))
  }
}
