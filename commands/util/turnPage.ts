import Discord from 'discord.js'

export default function turnPage(interaction: Discord.ButtonInteraction, page:number, totalPages: number){
  interaction.customId == "pageLeft" ? page-- : page++
  if(page == totalPages + 1){page = 1}
  else if(page == 0){page = totalPages}
  return page
}
