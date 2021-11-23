/*import Discord from 'discord.js'
import pageEmbed from '../../class/types/pageEmbed'
import sleep from '../../genericFunctions/sleep'
export default function messageReaction(content:string ,newEmbed:boolean, pageEmbed:pageEmbed) {
  const message = pageEmbed.message
  let title = ''
  if(pageEmbed.waifus){title = 'reserve'}
  else if(pageEmbed.items){title = 'items'}
  else if(pageEmbed.help){title = `help_${pageEmbed.page}`}
  else if(pageEmbed.otherType == "userShop"){title = 'user_shop'}

  let embed = new Discord.MessageEmbed()
  embed.setFooter(`Page ${pageEmbed.page}/${pageEmbed.totalPages}`)
  embed.setColor(0x35A7BF)
  embed.setTitle(eval(getLoc)(title+"_title"))
  embed.setDescription(content)
  if(newEmbed){
    message.reply(embed).then(async function(discordMessage: Discord.Message){
      discordMessage.react("⬅️")
      await sleep(500)
      discordMessage.react("➡️")
      message.id = discordMessage.id
    });
    allPagesEmbed.set(pageEmbed.id, pageEmbed)
    setTimeout(() => {
      allPagesEmbed.delete(pageEmbed.id)
    }, 1000*60*2)
  }
  else{
    message.edit(embed)
  }
}
*/
