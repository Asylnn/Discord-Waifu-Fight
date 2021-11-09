import Discord from 'discord.js'

export default function createSimpleEmbed(page:number, totalPages:number, title:string, content:string){
  const embed = new Discord.MessageEmbed()
  embed.setFooter(`Page ${page}/${totalPages}`)
  embed.setColor(0x35A7BF)
  embed.setTitle(eval(getLoc)(title))
  embed.setDescription(content)
  return embed
}
