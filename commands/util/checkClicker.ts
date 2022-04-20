import Discord from 'discord.js'

export default function checkClicker(interaction:Discord.ButtonInteraction | Discord.SelectMenuInteraction, id:string){
  if (interaction.user.id == id) {
    return false
  }
  else {
    interaction.reply({ content: `These aren't for you!`, ephemeral: true });
    return true
  }
}
