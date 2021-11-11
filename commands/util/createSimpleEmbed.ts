import Discord from 'discord.js'

export default function createSimpleEmbed(title:string, content:string){
  const embed = new Discord.MessageEmbed()
  embed.setColor(0x35A7BF)
  embed.setTitle(title)
  embed.setDescription(content)
  return embed
}
